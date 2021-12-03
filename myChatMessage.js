const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
    
    var bodyJSON = JSON.parse(event.body);
    console.log(bodyJSON);
    
    const userName = bodyJSON.username;
    const userAge = bodyJSON.userage;
    const userId = bodyJSON.userid;

    const connectionId = event.requestContext.connectionId;
    const sourceIp = event.requestContext.identity.sourceIp;
    const requestTime = event.requestContext.requestTime;
   
     
    addOperation(connectionId, sourceIp, requestTime, userName, userAge, userId).then(() => {
        callback(          
            
            null, {statusCode: 200, body: JSON.stringify(connectionId)}); 
    });
    
    
// put item https://docs.aws.amazon.com/cli/latest/reference/dynamodb/put-item.html
 function addOperation (connectionId, sourceIp, requestTime, userName, userAge, userId) {
    return ddb.put({
        TableName:
            'masterUsers',     
            Item: { 
                    id: connectionId,
                    sourceip : sourceIp,
                    requestTime : requestTime,
                    username: userName, 
                    userage: userAge, 
                    userid: userId
              }
    }).promise();
}
};
