express = require('express');
http = require('http');
socketio = require('socket.io');

class Application {

    http;
    io;

    chat = [];

    constructor() {
        this.http = new http.Server(express());
        this.io = socketio(this.http, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"]
            }
        })
    }

    run() {
        this.io.on("connection", socket => {
            socket.on("sendMessage", message => {
                this.chat.push(message);
                this.io.emit("chat", message);
            });
            this.io.emit("initChat", this.chat);

            console.log(`Socket ${socket.id} has connected`);
        });
        this.http.listen(4444, () => {
            console.log('Listening on port 4444');
        });
    }
}


new Application().run();

