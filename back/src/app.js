express = require('express');
http = require('http');
socketio = require('socket.io');
let { ReceiveMessageOut } = require("./web/out/ReceiveMessageOut");
let { ReceiveMessageIn } = require("./web/in/ReceiveMessageIn");
const { ChatService } = require('./application/service/ChatService.js');
const { PlayerService } = require('./application/service/PlayerService.js');
const { GameService } = require('./application/service/GameService');

class Application {

    http;
    io;

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
        let chatService = new ChatService();
        let receiveMessageOut = new ReceiveMessageOut(this.io, chatService);
        let receiveMessageIn = new ReceiveMessageIn(chatService, receiveMessageOut);
        let playerService = new PlayerService()
        let gameService = new GameService()
        gameService.addGame("Game1", "Player1", playerService);
        gameService.addGame("Game2", "Player2", playerService);
        this.io.on("connection", socket => {
            receiveMessageIn.initConnection(socket);
            this.io.emit("initChat", chatService.getChat().getMessages());

            console.log(`Socket ${socket.id} has connected`);
        });
        this.http.listen(4444, () => {
            console.log('Listening on port 4444');
        });
    }
}


new Application().run();

