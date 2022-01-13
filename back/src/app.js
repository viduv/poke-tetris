express = require('express');
http = require('http');
socketio = require('socket.io');
const {ReceiveMessageOut} = require("./web/out/ReceiveMessageOut");
const {ReceiveMessageIn} = require("./web/in/ReceiveMessageIn");
const {GameListIn} = require('./web/in/GameListIn');
const {GameListOut} = require('./web/out/GameListOut');
const {ChatService} = require('./application/service/ChatService.js');
const {GameService} = require('./application/service/GameService');
const {CreateGameIn} = require('./web/in/CreateGameIn');
const {GameIn} = require('./web/in/GameIn');
const {JoinGameIn} = require('./web/in/JoinGameIn');
const {SelfOut} = require('./web/out/SelfOut');
const {GameOut} = require("./web/out/GameOut");
const {LeaveGameIn} = require("./web/in/LeaveGameIn");
const {KickPlayerIn} = require("./web/in/KickPlayerIn");

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
        let selfOut = new SelfOut(this.io);
        let gameOut = new GameOut(this.io);
        let createGameIn = new CreateGameIn(gameListOut, gameService, selfOut, gameOut);
        let joinGameIn = new JoinGameIn(gameService, selfOut, gameOut);
        let gameIn = new GameIn(gameOut, gameService);
        let leaveGameIn = new LeaveGameIn(gameService, gameOut);
        let kickPlayerIn = new KickPlayerIn(gameService, gameOut);

        this.io.on("connection", socket => {
            receiveMessageIn.initConnection(socket);
            gameListIn.initConnection(socket);
            createGameIn.initConnection(socket);
            gameIn.initConnection(socket);
            joinGameIn.initConnection(socket);
            leaveGameIn.initConnection(socket);
            kickPlayerIn.initConnection(socket);

            this.io.emit("initChat", chatService.getChat().getMessages());

            console.log(`Socket ${socket.id} has connected`);
        });
        this.http.listen(4444, () => {
            console.log('Listening on port 4444');
        });
    }
}


new Application().run();

