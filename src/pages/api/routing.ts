import { Route } from "@/app/types";
import { calculateTime } from "@/utils/calculateTime";
import { findRoute } from "@/utils/findRoute";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
} from "@aws-sdk/lib-dynamodb";
import { nanoid } from "nanoid";
import { Table } from "sst/node/table";

export default async function handler(req: any, res: any) {
  const db = DynamoDBDocumentClient.from(new DynamoDBClient({}));

  if (req.method === "GET") {
    let results;

    const params = {
      TableName: Table.routes.tableName,
      
      ScanIndexForward: false,
      Limit: 10,
    };

    const scanCommand = new ScanCommand(params);
    results = await db.send(scanCommand);
    console.log("results", results?.Items);

    res.status(200).json({ routes: results?.Items });
    return;
  } else if (req.method === "POST") {

    const {startingPoint, pickupPoint, deliveryPoint} = req.body;
    console.log("Req", req.body)

    const route = await findRoute(startingPoint, pickupPoint, deliveryPoint);
    console.log({route})
    const time = await calculateTime(route as any);

    console.log("Tempo total é de: ", time);

    const text = (Math.random() * 100).toString();
    const unixTimestamp = Math.floor(new Date().getTime() / 1000);
    const payload:Route = {
      id: nanoid(),
      route: JSON.stringify(route),
      createdAt: unixTimestamp,
      totalTime:(time ?? -1)
    };

    await db.send(
      new PutCommand({
        TableName: Table.routes.tableName,
        Item: payload,
      })
    );

    res.status(200).json({ routes: payload });
    return;
  }
}
