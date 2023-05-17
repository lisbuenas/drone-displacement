The project uses the sst framework, to allow fast pace development and deployment on serverless tools
## Getting Started

You'll need the AWS credentials configured on machine

First, run the development server:


```bash
yarn sst dev

```

Open [http://localhost:3000](http://localhost:3000) and the project will run locally with online resources available on DynamoDB

## Deployment


It'll create the cloud resources to run the project

```bash
yarn dev

```
To deploy the project

```bash
yarn sst deploy --stage prod
```

And the URL of cloudfront will be returned to access the project

## About the project

The project were created with nextjs, with a SST framework to a simple and fast deployment process, that include a CDK behind the scenes.

Created some Unit tests to cover the time calculation functions between the path and dikjstra (removing diagonal movement) algoritm. We can improve implementing a customized Board size, with a extra resources as different weights (including infinite), with a A* algoritm

Used tailwind css with the basic setup of the nextjs project to cover the basic responsiveness and interface

Used the hook pattern to split UI from business logic

Missing some validations to improve the usage experience