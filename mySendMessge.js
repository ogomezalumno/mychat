const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
    
    // create api ApiGatewayManagementApi to make a POST from lambda to engine by connectionid
    let apiGatewayManagementApi = new AWS.ApiGatewayManagementApi({ 
        
        apiVersion: '2018-11-29',    
        endpoint: 'https://a6ytms7731.execute-api.eu-central-1.amazonaws.com/sandbox/',
        region: 'eu-central-1'
      
    }); 
  
    console.log(event);
    
    if (event.body) {
    
        //Preparamos los mensajes de vuelta a usar en la CallBack
        let response_success = {
                statusCode: 200,
                body: JSON.stringify({message:'OK'})
            };
            
        let   response_error = {
                statusCode: 400,
                body: JSON.stringify({message:'ERROR: No se pudo enviar el mensaje'} )
            };

        var bodyJSON = JSON.parse(event.body);
        console.log("OK Lets do it");
        console.log(bodyJSON.mensaje);

        //package the message data to send 
        const mensaje = {
            "mensaje" : event.body.mensaje, 
        };
        
        //package to string, ApiGatewayManagementApi ONLY send string as Data
        const mensajeAsString = JSON.stringify(mensaje);
       
        const params = {
                    ConnectionId: event.body.Id,
                    Data: mensajeAsString
                };
        
        //ApiGatewayManagementApi POST to ConnectionId
        apiGatewayManagementApi.postToConnection(params, function(err, data) {
            if (err) 
               { 
                callback(response_error);}
             else  
               { 
                callback(undefined, response_success);}
        });
    }
};
