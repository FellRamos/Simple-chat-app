//make connection to Server
var socket = io.connect('http://localhost:8000');

// Query DOM
var message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    btn = document.getElementById('button'),
    output = document.getElementById('output');


// Emit Events
btn.addEventListener('click', () => {
  socket.emit('chat-message', {
    message: message.value,
    handle: handle.value
  });
  message.value = '';
});



//Listening Events
socket.on('chat-message', (data) => {
  output.innerHTML += '<p><strong>' + data.handle + ':</strong> ' + data.message + '</p>';
});
