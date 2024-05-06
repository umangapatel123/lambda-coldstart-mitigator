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

        print(response)
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

print("Select the function to restart:")
for i, function in enumerate(function_array):
    print(f"{i}: {function}")
print("3" + ": " + "All")
index = int(input("Enter the index of the function to restart: "))

if index == 3:
    for function in function_array:
        force_lambda_restart(
            function_name=function,
        )
else:
    force_lambda_restart(
        function_name=function_array[index],
    )
