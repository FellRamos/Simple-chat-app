//make connection to Server
var socket = io.connect('http://localhost:8000');

// Query DOM
var message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    btn = document.getElementById('button'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback');


// Emit Events
btn.addEventListener('click', () => {
  socket.emit('chat-message', {
    message: message.value,
    handle: handle.value
  });
  message.value = '';
});


message.addEventListener('keypress', () => {
  socket.emit('typing', handle.value);
})


//Listening Events
socket.on('chat-message', (data) => {
  feedback.innerHTML = '';
  output.innerHTML += '<p><strong>' + data.handle + ':</strong> ' + data.message + '</p>';
});


socket.on('typing', (data) => {
  feedback.innerHTML = "<p><em>" + data + " is typing a message...</em></p>";
});
