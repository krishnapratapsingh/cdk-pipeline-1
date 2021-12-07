const { NODE_ENV } = process.env;

let branch = 'poc';


if (NODE_ENV === 'poc') branch = 'poc';
else if (NODE_ENV === 'dev') branch = 'dev';
else if (NODE_ENV === 'production') branch = 'prod';
else if (NODE_ENV === 'demo') branch = 'demo';


export const GIT_BRANCH = branch;
export const gitHubConnectionArnParameterStorePath = '/cdk-pipeline/github/connection/arn';

