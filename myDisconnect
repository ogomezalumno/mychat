const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    var params = {
        TableName:"masterUsers",
        Key:{
            "id":event.requestContext.connectionId,
        }
    };
    
    ddb.delete(params, function(err, data) {
        if (err) {
            console.error("No se ha podido borrar la sesión de usuario. Error JSON:", JSON.stringify(err, null, 2));
        }
    });
    
    const response = {
        statusCode: 200,
        body: JSON.stringify('Desconectado'),
    };
    return response;
};
