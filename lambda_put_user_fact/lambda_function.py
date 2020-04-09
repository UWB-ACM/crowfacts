import json
import boto3
import os

def lambda_handler(event, context):
	# Create a connection to the DynamoDB instance of AWS
	dynamodb = boto3.resource('dynamodb')
	
	# Create a connection to the specific table we want from our DynamoDB. In this case, 'FunFacts'.
	table = dynamodb.Table('FunFacts')
	
	# Set some default responses for the API request
	code = 200
	response = 'Success!'
	
	# Check to make sure the expected data exists in the event body
	if 'fact' in event and 'source' in event:
		# Good, we have all the data we need
		
		# We should probably check the user's input to make sure it doesn't contain 
		# any bad words. (This is, after all, a site intended for anyone.)
		for i in range(1, 13):
			# Use environment variables
			word = os.environ['naughty' + str(i)]
			if word in event['fact'].lower() or word in event['source'].lower():
				# For logging
				print('Naughty words detected.')
				# Return error to API Gateway
				raise Exception('Thou said a naughty word, and the Crow of Judgement judges thee.')
				
		# Input is acceptable.
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
		except Exception as e:
			raise Exception('Server error:' + e.response['Error']['Message'])

	else:
		# Uh oh, the client sent a malformed request.
		# Use the initialized response and code values; do nothing else.
		raise Exception('The client request was malformed and required data is missing.')
	
	return {
		'statusCode': code,
		'body': response
	}

