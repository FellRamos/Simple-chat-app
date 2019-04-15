//make connection to Server
var socket = io.connect('http://localhost:8000');

// Query DOM
var message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    btn = document.getElementById('button'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback');


var username = prompt("Quel est votre pseudo? ");
socket.emit('nick', username);


// Emit Events
btn.addEventListener('click', () => {
  if(message.value !== ''){
    socket.emit('chat-message', {
      user: username,
      message: message.value
    });
    message.value = '';
  }
});


// Keypress checker - if the keycode is Enter, we emit a chat-message event to the backend.
message.addEventListener('keypress', (k) => {
  if( k.code === 'Enter' && message.value !== ''){
    socket.emit('chat-message', {
      user: username,
      message: message.value
    });
    message.value = '';
  } else if (k.code !== 'Enter'){
    socket.emit('typing', username);
  }
});

// Keyup to stop typing? -- The Keyup removes immediatly after "unpress" the key. But I won't let it do it unless the message.value is empty!
message.addEventListener('keyup', () => {
  if (message.value === ''){
    socket.emit('notTyping');
  }
});


//Listening Events
socket.on('chat-message', (data) => {
  feedback.innerHTML = '';
  output.innerHTML += '<p><strong>' + data.user + ':</strong> ' + data.message + '</p>';
});


socket.on('typing', (data) => {
  feedback.innerHTML = "<p><em>" + data + " is typing a message...</em></p>";
});

socket.on('notTyping', () => {
  feedback.innerHTML = '';
});


socket.on('nick', (username) => {
  alert("Hello " + username);
});

socket.on('new_user', (username) => {
  output.innerHTML += '<p><em>' + username + " is now connected</em></p>";
});
