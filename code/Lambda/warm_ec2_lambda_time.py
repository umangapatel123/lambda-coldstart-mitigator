import requests

import boto3
import time

def force_lambda_restart(function_name):
    """
    Restart a Lambda function by updating its configuration.
    This is for testing purposes only.
    To compare the cold start time with the new logic of warm start.
    """
    try:
        lambda_client = boto3.client('lambda')
        response = lambda_client.update_function_configuration(
            FunctionName=function_name,
            Description=f'Forced update {int(time.time())}'
        )
        return response
    except Exception as e:
        print(f"Error: {e}")
        return e

function_array = [
    'chatApplication-EC2-GetQuery',
    'chatApplication-EC2-HandleQuery',
    'chatApplication-EC2-StoreQuery',
]

counter = 0

while True:
    # print(counter)
    response = requests.get('http://13.233.80.136/api/queries')
    print(response.elapsed.total_seconds())
    counter += 1
    if counter == 50:
        break
    time.sleep(1)