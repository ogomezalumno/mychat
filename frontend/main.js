// Comprobamos si el navegador soporta web sockets
if ("WebSocket" in window) {
  let socket = new WebSocket("wss://a6ytms7731.execute-api.eu-central-1.amazonaws.com/sandbox");
  var login = false;
  var userid = "";

  function render(data) {
    var html = `<div>
                <strong>${data}</strong>
                </div>`;
      
    document.getElementById("messages").innerHTML = html;
  }

  function Login(event) {
    var message = {
      action: "user",
      username: document.getElementById("username").value
    };
    // En proceso de registro en la bbdd
    login = true;
    socket.send(JSON.stringify(message));
    document.getElementById("username").value = "";
    return false;
  }

  function GetUsers(event) {
    var message = {
      action: "getusers",
    };
    socket.send(JSON.stringify(message));
    
    return false;
  }

//  function SendMessage(event) {
//    var message = {
//      text: document.getElementById("texto").value,
//    };

    //socket.emit("action", message);
//    return false;
//  }

  socket.onopen = function(event) {
         userid = "";
      };

  socket.onerror = function(error) {
        login = false; 
        userid = "";
        alert(`[error] ${error.message}`);
      };

  socket.onmessage = function(event) {
        // Si nos estabamos registrando en la bbdd de la palicación...
        if (login == true) {
           // Informamos y recolectamos nuestro ID de sesión websockets
           render("Conectado con ID: "+event.data);
           userid = event.data;
           login = false;
           GetUsers(event);
        }
        else {
           //var datos = JSON.parse(event.data);
           // Tenemos que ver si nos devuelven un mensaje o la lista de usuarios
           const lista_usuarios = JSON.parse(event.data);
           if (lista_usuarios.length > 1) {

              // Quitamos los usuarios de la lista en el HTML
              userListElement = document.getElementById('userlist');
              while (userListElement.hasChildNodes()) {
                userListElement.removeChild(userListElement.lastChild);
              }

              // Rellenamos la lista con los usuarios actuales
              for (var i = 0; i < lista_usuarios.length; i++) {

                  const option = document.createElement('option');
                      option.value = lista_usuarios[i].username;
                      option.text = lista_usuarios[i].username;
                  userListElement.appendChild(option);
              }
           }
           else {
              render(event.data);
           }
        }
      };

  socket.onclose = function(event) {
        login = false; 
        userid = "";
        if (event.wasClean) {
          alert(`[close] Conexión cerrada, code=${event.code} source=${event.reason}`);
        } 
        else {  
          alert('[Error] Conexión perdida');
        }
      };
} 
else {          
  // The browser doesn't support WebSocket
  alert("WebSocket no está soportado por tu Browser!");
}

function preguntarAntesDeSalir()
{
  socket.close();
  return 
}
