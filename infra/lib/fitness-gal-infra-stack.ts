import { CfnOutput, Duration, RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import { LambdaRestApi } from 'aws-cdk-lib/aws-apigateway';
import { InstanceClass, InstanceSize, InstanceType, Port, SubnetType, Vpc } from 'aws-cdk-lib/aws-ec2';
import { CompositePrincipal, Effect, PolicyStatement, Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { Code, Function, LayerVersion, Runtime, DockerImageFunction, DockerImageCode } from 'aws-cdk-lib/aws-lambda';
import {
  Credentials,
  DatabaseInstance,
  DatabaseInstanceEngine,
  DatabaseProxy,
  MysqlEngineVersion,
  PostgresEngineVersion,
  ProxyTarget, StorageType
} from 'aws-cdk-lib/aws-rds';
import { ISecret, Secret } from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';
import { join, resolve } from 'path';

export class MyFitnessGalInfraStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Create VPC for RDS and lambda resolvers
    // Create a new VPC
    const vpc = new Vpc(this, 'CarmaTech-VPC', {
      maxAzs: 2,
      subnetConfiguration: [
        {
          cidrMask: 24,
          name: 'privatelambda',
          subnetType: SubnetType.PRIVATE_WITH_EGRESS,
        },
        {
          cidrMask: 24,
          name: 'public',
          subnetType: SubnetType.PUBLIC,
        },
      ],
    });

    // IAM Role
    const role = new Role(this, 'Role', {
      roleName: 'rds-role',
      description: 'Role used in RDS stack',
      assumedBy: new CompositePrincipal(
        new ServicePrincipal('rds.amazonaws.com'),
        // new ServicePrincipal('lambda-amazonaws.com')
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
        generateStringKey: 'password',
        excludePunctuation: true,
        includeSpace: false,
        passwordLength: 30,
      },
      removalPolicy: RemovalPolicy.DESTROY,
    });

    // Generate a secret string
    const jwtSecret = new Secret(this, 'MySecret', {
      secretName: 'MySecretName',
      generateSecretString: {
        secretStringTemplate: JSON.stringify({
          jwt_secret_key: 'uAsBw6WxqD',
        }),
        generateStringKey: 'jwt_secret_key',
        excludePunctuation: true,
        includeSpace: false,
        passwordLength: 30,
      },
      removalPolicy: RemovalPolicy.DESTROY,
    });

    // Create the RDS instance
    const rdsInstance = new DatabaseInstance(this, 'FitnessGalDatabase', {
      engine: DatabaseInstanceEngine.mysql({
        version: MysqlEngineVersion.VER_8_0_31,
      }),
      instanceType: InstanceType.of(InstanceClass.T4G, InstanceSize.MICRO),
      credentials: Credentials.fromSecret(secret), // Use the generated secret as credentials
      vpc,
      vpcSubnets: vpc.selectSubnets({
        subnetType: SubnetType.PRIVATE_WITH_EGRESS,
      }),
      multiAz: false,
      allocatedStorage: 5,
      storageType: StorageType.GP2,
      databaseName: 'myfitness_gal',    // need to create a default database for app to use
      cloudwatchLogsExports: ['audit', 'error', 'general', 'slowquery'],
      deletionProtection: false,
    });

    const dbAccessPolicy = new PolicyStatement({
      actions: ['rds-db:connect'],
      effect: Effect.ALLOW,
      resources: [rdsInstance.instanceArn],
    });
    // rdsInstance.secret?.grantRead(role);

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

    const lambdaHandler = new DockerImageFunction(this, "BackendHandler", {
      code: DockerImageCode.fromImageAsset(join(__dirname, '../../backend/app')),
      timeout: Duration.seconds(50),
      vpc,
      vpcSubnets: vpc.selectSubnets({
        subnetType: SubnetType.PRIVATE_WITH_EGRESS,
      }),
      environment: {
        NODE_PATH: "$NODE_PATH:/opt",
        'DB_Type': 'mysql',
        'RDS_ARN': secret.secretArn,
        'DB_HOSt': dbProxy.endpoint,
        'DB_USERNAME': 'root',
        'DB_PASSWORD': this.getValueFromSecret(secret, 'password'),
        'DB_DATABSE': 'myfitness_db',
        'JWT_SECRET_KEY': this.getValueFromSecret(jwtSecret, 'jwt_secret_key'),
        'JWT_EXPIRATION_TIME': '3600',
      },
    });

    // add lambda securityGroup to the dbProxy
    dbProxy.connections.addSecurityGroup(lambdaHandler.connections.securityGroups[0]);
    secret.grantRead(lambdaHandler);

    dbProxy.grantConnect(lambdaHandler);

    rdsInstance.connections.securityGroups[0].addIngressRule(
      lambdaHandler.connections.securityGroups[0],
      Port.tcp(3306),
      'API Lambda to PostreSQL database'
    );

    const testLambda = new Function(this, "TestHanlder", {
      runtime: Runtime.NODEJS_18_X,
      code: Code.fromAsset(resolve(__dirname, '../../backend/test')),
      handler: "index.handler",
    });

    const restApi = new LambdaRestApi(this, 'BackendEndpoint', {
      handler: lambdaHandler
    })

    const testApi = new LambdaRestApi(this, 'TestEndpoint', {
      handler: testLambda
    })

    // Output the rest API URL
    new CfnOutput(this, 'LambdaApiUrl', {
      value: restApi.url ?? 'Something went wrong with the API Gateway'
    });

  }
  // Helper function to get the secret by its key
  private getValueFromSecret = (secret: ISecret, key: string): string => {
    return secret.secretValueFromJson(key).unsafeUnwrap()
  }
}

