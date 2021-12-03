const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler = function(event, context, callback){
	
	var params = {
		TableName : 'masterUsers',
	};
	
	dynamoDb.scan(params, function(err, data){
		if(err){
			console.log(err);
		    callback(err, null);
		}else{
			console.log(data.Items);
		    callback(null, {statusCode: 200, body: JSON.stringify(data.Items)});
		}
	});
};
