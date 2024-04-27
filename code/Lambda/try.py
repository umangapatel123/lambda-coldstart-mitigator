import boto3
import json
import time

client = boto3.client('logs')

def get_latest_log_message(function_name):
    """
    Get the latest log message of a Lambda function.
    """
    response = client.describe_log_streams(
        logGroupName=f'/aws/lambda/{function_name}',
        orderBy='LastEventTime',
        descending=True,
        limit=1
    )
    logStreamName = response['logStreams'][0]['logStreamName']

    response = client.get_log_events(
        logGroupName=f'/aws/lambda/{function_name}',
        logStreamName=logStreamName,
        limit=1,
        startFromHead=False
    )

    return response['events'][0]['message'].strip()

while True:
    response1 = get_latest_log_message('chatApplication-HandleQuery')
    response2 = get_latest_log_message('chatApplication-GetQuery')
    response3 = get_latest_log_message('chatApplication-StoreQuery')
    with open('/tmp/status.json', 'w') as f:
        json.dump({
            'chatApplication_HandleQuery': response1,
            'chatApplication_GetQuery': response2,
            'chatApplication_StoreQuery': response3
        }, f, indent=4)
    time.sleep(5)