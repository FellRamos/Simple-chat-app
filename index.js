var express = require('express'),
    socket = require('socket.io');


// Server setup

var app = express();

//starting the server with app.listen, and save this to a var server.

var server = app.listen(8000, () => {
  console.log("listening on port 8000")
});


// middleware to serve static files (in public folder)
app.use(express.static('public'));
