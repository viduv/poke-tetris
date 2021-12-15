const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const chat = [];

io.on("connection", socket => {

    socket.on("getChat", () => {
 //     io.emit("chat", chat);
    });

    socket.on("sendMessage", message => {
        chat.push(message);
        console.log("recieve", message);
        io.emit("chat", message);
      });

      io.emit("chat", "");

      console.log(`Socket ${socket.id} has connected`);

  });

  http.listen(4444, () => {
    console.log('Listening on port 4444');
  });