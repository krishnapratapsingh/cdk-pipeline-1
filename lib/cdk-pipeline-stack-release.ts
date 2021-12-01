import { Stage, Construct, StageProps,} from '@aws-cdk/core';
import { FirstCftPipelineStack } from './stacks/myFirstChildPipeline';
import { cfnlintProjStack } from './stacks/cfn-lint-stack';


export class CdkchildpipelineRelease extends Stage {
  constructor(scope: Construct, id: string, props?: StageProps) {
    super(scope, id, props);
    const FirstChildRef = new FirstCftPipelineStack(this, 'my-First-Child-Pipeline');
    FirstChildRef.templateOptions.description = 'First-pipeline';
        const cfnlintObj = new cfnlintProjStack( this, "SyntexValidationProject");
    cfnlintObj.templateOptions.description = 'SyntexValidationProject';
  }
}
