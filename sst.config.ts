import { SSTConfig } from "sst";
import { NextjsSite, Bucket, Table } from "sst/constructs";

export default {
  config(_input) {
    return {
      name: "drone-app",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const bucket = new Bucket(stack, "public");

      const table = new Table(stack, "routes", {
        fields: {
          id: "string",
          createdAt: "number",
          route: "string",
        },
        primaryIndex: { partitionKey: "id", sortKey: "createdAt" },
      });

      const site = new NextjsSite(stack, "site", {
        bind: [bucket, table],
      });

      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
