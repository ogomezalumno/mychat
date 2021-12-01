// Comprobamos si el navegador soporta web sockets
if ("WebSocket" in window) {
  let socket = new WebSocket("wss://a6ytms7731.execute-api.eu-central-1.amazonaws.com/sandbox");

  socket.onopen = function(event) {
//        alert("[open] Connected");
      };

  socket.onerror = function(error) {
        alert(`[error] ${error.message}`);
      };

  socket.onmessage = function(event) {
        alert(`[message] Data from server: ${event.data}`);
        render(event.data);
      };

  socket.onclose = function(event) {
        if (event.wasClean) {
          alert(`[close] Conexión cerrada, code=${event.code} source=${event.reason}`);
        } 
        else {  
          alert('[Error] Conexión perdida');
        }
      };

  function render(data) {
    var html = `<div>
                <strong>${data}</strong>:
                <em>render_info</em>
                </div>`;
      
    document.getElementById("messages").innerHTML = html;
  }

  function Login(event) {
    var message = {
      action: "user",
      username: document.getElementById("username").value,
      userid: 1
    };
    console.log(message);
    socket.send(JSON.stringify(message));
    document.getElementById("username").value = "";
    return false;
  }

  function SendMessage(event) {
    var message = {
      text: document.getElementById("texto").value,
    };

    //socket.emit("action", message);
    return false;
  }
} 
else {          
  // The browser doesn't support WebSocket
  alert("WebSocket no está soportado por tu Browser!");
}
