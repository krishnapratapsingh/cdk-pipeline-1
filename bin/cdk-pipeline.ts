#!/usr/bin/env node
import 'source-map-support/register';
import {App} from '@aws-cdk/core';
import { CdkPipelineStack, service, description } from '../lib/cdk-pipeline-stack';

const { NODE_ENV } = process.env;

if (!NODE_ENV) {
  throw new Error('NODE_ENV variable is required');
}


const app = new App();
const env = { region: 'ap-south-1' };
new CdkPipelineStack(app, `${service}-stack`, {
	env,
});
//CdkPipelineStack.templateOptions.description = description;
app.synth();
