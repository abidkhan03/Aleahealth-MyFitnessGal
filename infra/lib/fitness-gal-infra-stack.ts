import { CfnOutput, Duration, RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import { LambdaIntegration, LambdaRestApi, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { InstanceClass, InstanceSize, InstanceType, InterfaceVpcEndpointAwsService, Port, SecurityGroup, SubnetType, Vpc } from 'aws-cdk-lib/aws-ec2';
import { CompositePrincipal, Effect, PolicyStatement, Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { Code, DockerImageCode, DockerImageFunction, Function, LayerVersion, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Credentials, DatabaseInstance, DatabaseInstanceEngine, DatabaseProxy, PostgresEngineVersion, ProxyTarget, StorageType } from 'aws-cdk-lib/aws-rds';
import { ISecret, Secret } from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';
import { join } from 'path';

export class MyFitnessGalInfraStack extends Stack {
  private readonly dockerImageAssetPath: string = join(__dirname, './docker-image');
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Create VPC for RDS and lambda resolvers
    const vpc = new Vpc(this, 'vpc', {
      vpcName: 'rds-vpc',
      maxAzs: 2,
      natGateways: 0,
      subnetConfiguration: [
        {
          cidrMask: 24,
          name: 'privateLambda',
          subnetType: SubnetType.PRIVATE_WITH_EGRESS,
        },
        {
          cidrMask: 24,
          name: 'public',
          subnetType: SubnetType.PUBLIC,
        },
      ]
    });

    // IAM Role
    const role = new Role(this, 'Role', {
      roleName: 'rds-role',
      description: 'Role used in RDS stack',
      assumedBy: new CompositePrincipal(
        new ServicePrincipal('rds.amazonaws.com'),
        new ServicePrincipal('lambda-amazonaws.com')
      )
    })
    role.addToPolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: [
          'cloudwatch:PutMetricData',
          'ec2:CreateNetworkInterface',
          'ec2:DescribeNetworkInterfaces',
          'ec2:DeleteNetworkInterface',
          'ec2:DescribeInstances',
          'ec2:DescribeSubnets',
          'ec2:DescribeSecurityGroups',
          'ec2:DescribeRouteTables',
          'logs:CreateLogGroup',
          'logs:CreateLogStream',
          'logs:PutLogEvents',
          'lambda:InvokeFunction',
          'secretsmanager:GetSecretValue',
          'secretsmanager:CreateSecret',
          'kms:descrupt',
          'rds-db:connect'
        ],
        resources: ['*']
      })
    );

    // Generate a secret for the database password
    const secret = new Secret(this, 'DBSecret', {
      generateSecretString: {
        secretStringTemplate: JSON.stringify({ username: 'root' }),
        generateStringKey: 'Password@123',
        excludePunctuation: true,
        includeSpace: false,
        passwordLength: 30,
      },
      removalPolicy: RemovalPolicy.DESTROY,
    });

    // RDS PostgreSQL Instance
    const rdsInstance = new DatabaseInstance(this, 'PostgresRds', {
      engine: DatabaseInstanceEngine.postgres({
        version: PostgresEngineVersion.VER_16_1
      }),
      instanceType: InstanceType.of(InstanceClass.T4G, InstanceSize.MICRO),
      vpcSubnets: vpc.selectSubnets({
        subnetType: SubnetType.PRIVATE_WITH_EGRESS,
      }),
      vpc,
      port: 5432,
      multiAz: false,
      allocatedStorage: 5,
      maxAllocatedStorage: 5,
      storageType: StorageType.GP2,
      deleteAutomatedBackups: true,
      credentials: Credentials.fromSecret(secret),
      databaseName: 'myfitness-gal',
      cloudwatchLogsExports: ['audit', 'error', 'general', 'slowquery'],
    });
    rdsInstance.secret?.grantRead(role);

    // Create the RDS db proxy for access from lambda
    const dbProxy = new DatabaseProxy(this, 'Proxy', {
      proxyTarget: ProxyTarget.fromInstance(rdsInstance),
      secrets: [secret],
      securityGroups: [rdsInstance.connections.securityGroups[0]],
      vpc,
      requireTLS: false,
      vpcSubnets: vpc.selectSubnets({
        subnetType: SubnetType.PRIVATE_WITH_EGRESS,
      }),
    });

    // Create lambda layer
    const lambdaLayer = new LayerVersion(this, 'BackendLayer', {
      code: Code.fromAsset(join(__dirname, '../../../backend/app/node_modules')),
      compatibleRuntimes: [
        Runtime.NODEJS_LATEST,
        Runtime.NODEJS_18_X
      ]
    });

    const backendLambda = new Function(this, "BackendHandler", {
      runtime: Runtime.NODEJS_LATEST,
      code: Code.fromAsset("../../../backend/app/dist"),
      handler: "index.handler",
      layers: [lambdaLayer],
      vpc,
      role,
      vpcSubnets: vpc.selectSubnets({
        subnetType: SubnetType.PRIVATE_WITH_EGRESS,
      }),
      environment: {
        NODE_PATH: "$NODE_PATH:/opt",
        'DB_Type': 'postresql',
        'RDS_ARN': secret.secretArn,
        'DB_HOSt': dbProxy.endpoint,
        'DB_USERNAME': 'root',
        'DB_PASSWORD': this.getValueFromSecret(secret, 'Password@123'),
        'DB_DATABSE': 'myfitness-gal',
      },
    });

    // add lambda securityGroup to the dbProxy
    dbProxy.connections.addSecurityGroup(backendLambda.connections.securityGroups[0]);
    secret.grantRead(backendLambda);

    dbProxy.grantConnect(backendLambda);

    rdsInstance.connections.securityGroups[0].addIngressRule(
      backendLambda.connections.securityGroups[0],
      Port.tcp(5423),
      'API Lambda to PostreSQL database'
    );

    const testLambda = new Function(this, "TestHanlder", {
      runtime: Runtime.NODEJS_18_X,
      code: Code.fromAsset("../../../backend/test"),
      handler: "index.handler",
    });

    const restApi = new LambdaRestApi(this, 'BackendEndpoint', {
      handler: backendLambda
    })

    // Output the API Gateway URL
    new CfnOutput(this, 'LambdaApiUrl', {
      value: restApi.url ?? 'Something went wrong with the API Gateway'
    });

  }
  // Helper function to get the secret by its key
  private getValueFromSecret = (secret: ISecret, key: string): string => {
    return secret.secretValueFromJson(key).unsafeUnwrap()
  }
}

