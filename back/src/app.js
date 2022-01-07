express = require('express');
http = require('http');
socketio = require('socket.io');
let { ReceiveMessageOut } = require("./web/out/ReceiveMessageOut");
let { ReceiveMessageIn } = require("./web/in/ReceiveMessageIn");
let { GameListIn } = require('./web/in/GameListIn');
let { GameListOut} = require('./web/out/GameListOut');
const { ChatService } = require('./application/service/ChatService.js');
const { PlayerService } = require('./application/service/PlayerService.js');
const { GameService } = require('./application/service/GameService');
const { CreateGameIn } = require('./web/in/CreateGameIn');
const { GameIn } = require('./web/in/GameIn');
const { JoinGameIn } = require('./web/in/JoinGameIn');
const { SelfOut } = require('./web/out/SelfOut');
const { join } = require('path');


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
        // Set Object instances
        let chatService = new ChatService();
        let receiveMessageOut = new ReceiveMessageOut(this.io, chatService);
        let receiveMessageIn = new ReceiveMessageIn(chatService, receiveMessageOut);
        let gameService = new GameService();
        let gameListOut = new GameListOut(this.io, gameService)
        let gameListIn = new GameListIn(gameListOut)
        let playerService = new PlayerService()
        let selfOut = new SelfOut(this.io);
        let createGameIn = new CreateGameIn(gameListOut, gameService, playerService, selfOut);
        let joinGameIn = new JoinGameIn(gameService, playerService, selfOut);
        let gameIn = new GameIn();

        // 2 lines below for testing purpose
        gameService.addGame("Game1", "Player1", playerService, true);
        gameService.addGame("Game2", "Player2", playerService, false);


        this.io.on("connection", socket => {
            receiveMessageIn.initConnection(socket);
            gameListIn.initConnection(socket);
            createGameIn.initConnection(socket);
            gameIn.initConnection(socket);
            joinGameIn.initConnection(socket);
            
            this.io.emit("initChat", chatService.getChat().getMessages());

            console.log(`Socket ${socket.id} has connected`);
        });
        this.http.listen(4444, () => {
            console.log('Listening on port 4444');
        });
    }
}


new Application().run();

