import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

import {
    DynamoDBDocumentClient,
    PutCommand,
  } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});

const dynamo = DynamoDBDocumentClient.from(client);

const tableName = "chatapplication-userquery";

export const store = async (event,context) => {
    let body;
    let statusCode = 200;
    const headers = {
        "Content-Type": "application/json"
    };

    try {
        switch (event.routeKey) {
            case "POST /api/query":
                const { queryid, username, query, time } = JSON.parse(event.body);
                await dynamo.send(new PutCommand({
                    TableName: tableName,
                    Item: {
                        queryid,
                        username,
                        query,
                        time
                    }
                }));
                body = `Put item ${username}`;
                break;
            case "GET /api/store/ping":
                body = JSON.stringify({
                    response: "pong"
                });
                break;
            default:
                throw new Error(`Unsupported route: "${event.routeKey}"`);
        }
    } catch (err) {
        statusCode = 400;
        body = err.message;
    } finally {
        body = JSON.stringify(body);
    }

    return {
        statusCode,
        body,
        headers
    };
}