import json
import time
import boto3

client = boto3.client('logs', region_name='ap-south-1')

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
    log_stream_name = response['logStreams'][0]['logStreamName']

    response = client.get_log_events(
        logGroupName=f'/aws/lambda/{function_name}',
        logStreamName=log_stream_name,
        limit=1,
        startFromHead=False
    )

    return response['events'][0]['message'].strip()

while True:
    start = time.time()
    response1 = get_latest_log_message('chatApplication-EC2-HandleQuery')
    response2 = get_latest_log_message('chatApplication-EC2-GetQuery')
    response3 = get_latest_log_message('chatApplication-EC2-StoreQuery')
    with open('/tmp/status.json', 'w', encoding='utf-8') as f:
        json.dump({
            'chatApplication_HandleQuery': response1,
            'chatApplication_GetQuery': response2,
            'chatApplication_StoreQuery': response3
        }, f, indent=4)
    time.sleep(1)