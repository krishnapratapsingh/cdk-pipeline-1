import { Stage, Construct, StageProps,} from '@aws-cdk/core';
import { FirstCftPipelineStack } from './stacks/myFirstChildPipeline';
import { cfnlintProjStack } from './stacks/cfn-lint-stack';
//import { InfraCorgatewayAPI } from './stacks/infra-API-deploy';

const { NODE_ENV } = process.env;

export class CdkchildpipelineRelease extends Stage {
  constructor(scope: Construct, id: string, props?: StageProps) {
    super(scope, id, props);
    const FirstChildRef = new FirstCftPipelineStack(this, 'my-First-Child-Pipeline');
    FirstChildRef.templateOptions.description = 'First-pipeline';
    const cfnlintObj = new cfnlintProjStack( this, "SyntexValidationProject");
    cfnlintObj.templateOptions.description = 'SyntexValidationProject';
    //const infracoregatwayapi= new InfraCorgatewayAPI(this, 'infra-coregatway-api');
    //infracoregatwayapi.templateOptions.description = 'infra-coregatway-api';
  }
}
