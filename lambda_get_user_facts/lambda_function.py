import json
import boto3

def lambda_handler(event, context):
    
    dynamodb = boto3.resource('dynamodb')
    
    table = dynamodb.Table('FunFacts')
    
    #Get all entries in the database
    try:
        response = table.scan()
    except Exception as e:
        raise Exception(e.response['Error']['Message'])
    else:
        return {
	        'statusCode': 200,
	        'body': response
		}
