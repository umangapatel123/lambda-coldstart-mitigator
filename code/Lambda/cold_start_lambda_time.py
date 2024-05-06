import requests

import boto3
import time
import random
import string

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

# Call the function with the required arguments
# force_lambda_restart(
#     function_name='chatApplication-HandleQuery',
# )

function_array = [
    'chatApplication-GetQuery',
    'chatApplication-HandleQuery',
    'chatApplication-StoreQuery',
]

counter = 0

while True:
    # print(counter)
    # response = requests.get('https://bed2bkcc2b.execute-api.ap-south-1.amazonaws.com/api/random')
    # random data
    # {"queryid":"ur4hed","username":"User","query":"ok","time":"2024-04-24T07:38:16.312Z"}
    data = {
        # random queryid
        "queryid": string.ascii_lowercase + str(random.randint(0, 1000)),
        "username": "User",
        "query": "Hello",
        "time": time.strftime("%Y-%m-%dT%H:%M:%S.312Z")
    }
    response = requests.post('https://bed2bkcc2b.execute-api.ap-south-1.amazonaws.com/api/query', json=data)
    # response = requests.get('http://13.233.80.136/api/queries')
    print(response.elapsed.total_seconds())
    counter += 1
    if counter == 50:
        break
    # force_lambda_restart(
    #     function_name=function_array[2],
    # )
    time.sleep(1)