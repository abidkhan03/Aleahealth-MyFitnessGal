#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { MyFitnessGalInfraStack } from '../lib/fitness-gal-infra-stack';

const app = new cdk.App();
new MyFitnessGalInfraStack(app, 'MyFitnessGalInfraStack', {
 
});