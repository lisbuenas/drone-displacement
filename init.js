const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1",
  endpoint: "http://dynamodb:8000",
});

const dynamodb = new AWS.DynamoDB();

const params = {
  TableName: "routes",
  KeySchema: [
    { AttributeName: "id", KeyType: "HASH" },
    { AttributeName: "createdAt", KeyType: "STRING" },
  ],
  AttributeDefinitions: [
    { AttributeName: "id", AttributeType: "S" },
    { AttributeName: "createdAt", AttributeType: 'N' },
  ],
  BillingMode: "PAY_PER_REQUEST",
};

dynamodb.createTable(params, (err, data) => {
  if (err) {
    console.error(
      "Unable to create table. Error JSON:",
      JSON.stringify(err, null, 2)
    );
  } else {
    console.log(
      "Created table. Table description JSON:",
      JSON.stringify(data, null, 2)
    );
  }
});