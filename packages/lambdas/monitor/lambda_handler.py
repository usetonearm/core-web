import json

def lambda_handler(event, context):
    print("Success")
    return {
        'statusCode': 200,
        'body': json.dumps('Success')
    }
