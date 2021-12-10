const AWS = require('aws-sdk');
const dinamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    var params = {
        TableName:"masterUsers",
        Key:{
            "id":event.requestContext.connectionId,
        }
    };
    
    console.log(params);
    
    dinamodb.delete(params, function(err, data) {
        if (err) 
        { 
            console.log(err);
            
        }
        else  
        { 
           console.log(data);
        }
    });

    const response = {
        statusCode: 200,
        body: JSON.stringify('Desconectado'),
    };
    return response;
};
