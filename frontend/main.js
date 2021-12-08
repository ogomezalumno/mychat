// Comprobamos si el navegador soporta web sockets
if ("WebSocket" in window) {
  let socket = new WebSocket("wss://a6ytms7731.execute-api.eu-central-1.amazonaws.com/sandbox");
  var login = false;
  var userid = "";

  function render(data) {
    var html = `<div>
                <strong>${data.message}</strong>
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

  function SendMessage(event) {
    var message = {
      action: "sendmessage",
      id: document.getElementById('userlist').value,
      mensaje: document.getElementById('texto').value,
    };
    socket.send(JSON.stringify(message));
    return false;
  }

  socket.onopen = function(event) {
         userid = "";
      };

  socket.onerror = function(error) {
        login = false; 
        userid = "";
        alert(`[error] ${error.message}`);
      };

  socket.onmessage = function(event) {
        // Si nos estabamos registrando en la bbdd de la aplicación...
        if (login == true) {
           // Informamos y recolectamos nuestro ID de sesión websockets
           render({message:"Conectado con ID: "+event.data});
           userid = event.data;
           login = false;
           button1 = document.getElementById('button1');
           button1.disabled = true;
           username = document.getElementById('username');
           username.disabled = true;
           button2 = document.getElementById('button2');
           button2.disabled = false;
           button3 = document.getElementById('button3');
           button3.disabled = false;
           texto = document.getElementById('texto');
           texto.disabled = false;
           userListElement = document.getElementById('userlist');
           userListElement.disabled = false;
           GetUsers(event);
        }
        else {
           // Tenemos que ver si nos devuelven un mensaje o la lista de usuarios
           const lista_mensajes = JSON.parse(event.data);
           if (lista_mensajes.length > 1) {

              // Quitamos los usuarios de la lista en el HTML
              userListElement = document.getElementById('userlist');
              while (userListElement.hasChildNodes()) {
                userListElement.removeChild(userListElement.lastChild);
              }

              // Rellenamos la lista con los usuarios actuales
              for (var i = 0; i < lista_mensajes.length; i++) {
                  const option = document.createElement('option');
                      option.value = lista_mensajes[i].id;
                      option.text = lista_mensajes[i].username;
                  userListElement.appendChild(option);
              }
           }
           else {
              render(lista_mensajes);
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

function AntesDeSalir()
{
 button1 = document.getElementById('button1');
 button1.disabled = false;
 username = document.getElementById('username');
 username.disabled = false;
 button2 = document.getElementById('button2');
 button2.disabled = true;
 button3 = document.getElementById('button3');
 button3.disabled = true;
 texto = document.getElementById('texto');
 texto.disabled = true;
 userListElement = document.getElementById('userlist');
 userListElement.disabled = true;
 socket.close();
 return 
}
