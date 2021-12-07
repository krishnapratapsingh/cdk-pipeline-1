import 'source-map-support/register';
import {  Stack, StackProps, Construct, CfnOutput } from '@aws-cdk/core';
import { Artifact, Pipeline } from '@aws-cdk/aws-codepipeline';
import { BitBucketSourceAction, CodeBuildAction, S3DeployAction } from '@aws-cdk/aws-codepipeline-actions';
import { Project } from '@aws-cdk/aws-codebuild';
import { Bucket } from '@aws-cdk/aws-s3';
import { StringParameter } from '@aws-cdk/aws-ssm';
import {
  GIT_BRANCH,
  gitHubConnectionArnParameterStorePath,
} from '../comman/constants';

export class InfraCorgatewayAPI extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const repoSourceArtifact = new Artifact('SourceArtifact');
    const cloudFormationArtifact = new Artifact('CloudFormationPrepareOutput');
    const gitHubConnectionArn = StringParameter.valueForStringParameter(this, gitHubConnectionArnParameterStorePath);
	
    const sourceBucket = new Bucket( this, 'SourceBucket1286');
    const deployBucket = new Bucket(this, 'DeployBucket1286');
    const deployInput = new Artifact('S3deploy');
    const GitHubAction = new BitBucketSourceAction({
      actionName: 'Checkout',
      owner: 'krishnapratapsingh',
      repo: 'infra-coregatway-api',
      branch: GIT_BRANCH,
      connectionArn: gitHubConnectionArn,
      output: repoSourceArtifact,
    });

    const pipeline = new Pipeline(this, 'infra-coregatway-api', {
      pipelineName: 'infra-coregatway-api',
      restartExecutionOnUpdate: true,
      artifactBucket: sourceBucket,
      stages: [
        {
          stageName: 'SourceCodeDownload',
          actions: [
            GitHubAction,
          ],
        },
		{
		 stageName: 'Deploy',
		 actions: [
		 new S3DeployAction({
          actionName: 'S3Deploy',
          bucket: deployBucket,
          input: repoSourceArtifact,
          runOrder: 1,
        }),
		 ],
		},
      ],
    });

    new CfnOutput(this, 'PipelineArn: ', {
      value: pipeline.pipelineArn ?? 'Something went wrong with the deploy',
    });
  }
}

