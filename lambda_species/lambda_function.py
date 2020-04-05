import json
import boto3

def lambda_handler(event, context):
	# Create a connection to the DynamoDB instance of AWS
	dynamodb = boto3.resource('dynamodb')
	
	# Create a connection to the specific table we want from our DynamoDB. In this case, 'CrowFacts'.
	table = dynamodb.Table('CrowFactsTwo')
	
	print(table.table_name, table.table_id, table.item_count, table.key_schema)
	
	response = None
	code = 200
	
	# Check that the incoming request has the necessary parameters. 
    # In this case we are expecting 'CrowSpecies' and 'habitat'. 
	# For a GET method, the incoming parameters need to be the primary/sorting keys of the database.
	# For a POST method, the incoming parameters need to be the new data you want to add to the database
	
	if 'CrowSpecies' in event and 'location' in event:
		# we want to query the table for these specific parameters
		species = event['CrowSpecies']
		loc = event['habitat']
		try:
			response = table.get_item(
				# The Key is what we use to query the database (ie: We need the key to know what item to return)
				Key={
					'CrowSpecies': species,
					'habitat': loc
				}
			)
		except Exception as e:
			code = 400
			response = e.response['Error']['Message']
	else:
		# we want to get ALL items from the Dynamo table
		try:
			response = table.scan()
		except Exception as e:
			print(e)
			code = 500
			response = e.response['Error']['Message']
	
	return {
		'statusCode': code,
		'body': response
	}
