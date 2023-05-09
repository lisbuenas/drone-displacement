import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

import {
  ScanCommand,
  PutCommand,
  DynamoDBDocumentClient,
} from "@aws-sdk/lib-dynamodb";

import {nanoid} from "nanoid";

let test:any = [];

const Table:any = {}

export default async function handler(req:any, res:any) {
   const db = DynamoDBDocumentClient.from(new DynamoDBClient({}));

  console.log(test.length);

  if(req.method === "GET"){
    let results;

    if(Table?.routes){
      const params = {
        TableName: Table?.routes?.tableName,
        Limit: 15, // retrieve the last 15 items
        ScanIndexForward: false, // sort in descending order
      };
      
      const scanCommand = new ScanCommand(params);
      results = await db.send(scanCommand);
    }else{
      results = test;
    }


    
    res.status(200).json({ routes: results });
    return;
    
  }else if(req.method === "POST"){
    const text= (Math.random() *100).toString();
    if(Table?.routes){
      await db.send(
        new PutCommand({
          TableName:Table.routes.tableName,
          Item: {
            id: nanoid(),
            routes:text,
            createdAt: new Date().toISOString()
          },
        })
      );
    }else{
          
    test.push(nanoid());
    res.status(200).json({ routes: test });
    return;
    }
  }
}