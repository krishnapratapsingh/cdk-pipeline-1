#!/usr/bin/env node
import 'source-map-support/register';
import {App} from '@aws-cdk/core';
import { CdkPipelineStack, service, description } from '../lib/cdk-pipeline-stack';

const app = new App();
const env = { region: 'us-east-1' };
new CdkPipelineStack(app, `${service}-stack`, {
	env,
});
//CdkPipelineStack.templateOptions.description = description;
app.synth();
