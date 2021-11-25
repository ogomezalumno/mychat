const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
    
    console.log(event);
    
    var bodyJSON = JSON.parse(event.body);
    //console.log(bodyJSON);
    
    
    const userNme = bodyJSON.username;
    const userAge = bodyJSON.userage;
    const userId = bodyJSON.userid;

    const connectionId = event.requestContext.connectionId;
    const sourceIp = event.requestContext.identity.sourceIp;
    const requestTime = event.requestContext.requestTime;
       
         
        addOperation(connectionId, sourceIp, requestTime, userNme, userAge, userId).then(() => {
            callback(          
                
                null, {statusCode: 200, body: JSON.stringify('Connected to wss: ' +
                                connectionId + ', status: succesful ')}); 
        });
        
        
    // put item https://docs.aws.amazon.com/cli/latest/reference/dynamodb/put-item.html
     
    function addOperation (connectionId, sourceIp, requestTime, userNme, userAge, userId) {
        return ddb.put({
            TableName:
                '_usersMasterTable',     
                Item: { 
                    
                        connectionid: connectionId,
                        sourceip : sourceIp,
                        requestTime : requestTime,
                        username: userNme, ,
                        userage: userAge, 
                        userid: userId
                        
                       
                        
                  }
                
        }).promise();
    }
    };{statusCode: 200, body: JSON.stringify('Connected to wss: ' +
							connectionId + ', status: succesful ')}); 
    });
    
    
// put item https://docs.aws.amazon.com/cli/latest/reference/dynamodb/put-item.html
 
function addOperation (connectionId, sourceIp, requestTime, userNme, userAge, userId) {
    return ddb.put({
        TableName:
            '_usersMasterTable',     
            Item: { 
                
                    connectionid: connectionId,
                    sourceip : sourceIp,
                    requestTime : requestTime,
                    username: userNme, ,
                    userage: userAge, 
                    userid: userId
                    
                   
                    
              }
            
    }).promise();
}
};