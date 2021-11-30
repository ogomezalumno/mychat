var socket = io.connect("wss://a6ytms7731.execute-api.eu-central-1.amazonaws.com/sandbox", { forceNew: true });

socket.on("messages", function (data) {
  console.log(data);
  render(data);
});

function render(data) {
  var html = data
    .map(function (elem, index) {
      return `<div>
              <strong>${elem.author}</strong>:
              <em>${elem.text}</em>
            </div>`;
    })
    .join(" ");

  document.getElementById("messages").innerHTML = html;
}

function SendMessage(e) {
  var message = {
    author: document.getElementById("username").value,
    text: document.getElementById("texto").value,
  };

  //socket.emit("action", message);
  return false;
}

