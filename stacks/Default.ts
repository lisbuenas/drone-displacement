import { StackContext, NextjsSite,Bucket,Table } from "sst/constructs";

export function Default({ stack }: StackContext) {
    const bucket = new Bucket(stack, "public");


    const table = new Table(stack, "routes", {
        fields: {
          id: "string",
          createdAt: "number",
          route:"string"
        },
        primaryIndex: { partitionKey: "counter", sortKey:"createdAt" },
      });

  const site = new NextjsSite(stack, "site", {
    path: "packages/web",
    bind: [bucket,table]
  });

  stack.addOutputs({
    SiteUrl: site.url,
  });
}