import json
import boto3

def lambda_handler(event, context):
	# Create a connection to the DynamoDB instance of AWS
	dynamodb = boto3.resource('dynamodb')
	
	# Create a connection to the specific table we want from our DynamoDB. In this case, 'FunFacts'.
	table = dynamodb.Table('FunFacts')
	
	# Set some default responses for the API request
	response = 'The client request was malformed and required data is missing.'
	code = 400
	
	# Check to make sure the expected data exists in the event body
	if 'fact' in event and 'source' in event:
		# Good, we have all the data we need
		# Now, attempt the put_item() call on the table.
		try:
			response = table.put_item(
				# Item is required; this is the data to add to the table.
				# If an existing entry contains an identical primary key ('fact'),
				# the new data will overwrite the old data.
				Item={
					'fact': event['fact'],
					'source': event['source']
				},
				# If the new data overwrites an existing entry, we want to retrieve 
				# the old data so that we may inform the client.
				ReturnValues='ALL_OLD'
			)
			code = 200
		except Exception as e:
			code = 500
			response = e.response['Error']['Message']

	else:
		# Uh oh, the client sent a malformed request.
		# Use the initialized response and code values; do nothing else.
		pass
	
	return {
		'statusCode': code,
		'body': response
	}
