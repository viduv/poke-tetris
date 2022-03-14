express = require('express');
http = require('http');
socketio = require('socket.io');
const {GameListIn} = require('./web/in/GameListIn');
const {GameListOut} = require('./web/out/GameListOut');
const {GameService} = require('./application/service/GameService');
const {CreateGameIn} = require('./web/in/CreateGameIn');
const {GameIn} = require('./web/in/GameIn');
const {JoinGameIn} = require('./web/in/JoinGameIn');
const {SelfOut} = require('./web/out/SelfOut');
const {GameOut} = require("./web/out/GameOut");
const {LeaveGameIn} = require("./web/in/LeaveGameIn");
const {KickPlayerIn} = require("./web/in/KickPlayerIn");
const {DisconnectIn} = require("./web/in/DisconnectIn");
const {StartGameIn} = require("./web/in/StartGameIn");
const {LockLineIn} = require('./web/in/LockLineIn');
const {SpectrumIn} = require('./web/in/SpectrumIn');
const {LoseIn} = require('./web/in/LoseIn');

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
        let gameService = new GameService();
        let gameListOut = new GameListOut(this.io, gameService)
        let gameListIn = new GameListIn(gameListOut)
        let selfOut = new SelfOut(this.io);
        let gameOut = new GameOut(this.io);
        let createGameIn = new CreateGameIn(gameListOut, gameService, selfOut, gameOut);
        let joinGameIn = new JoinGameIn(gameService, selfOut, gameOut);
        let gameIn = new GameIn(gameOut, gameService);
        let leaveGameIn = new LeaveGameIn(gameService, gameOut, gameListOut);
        let kickPlayerIn = new KickPlayerIn(gameService, gameOut);
        let disconnectIn = new DisconnectIn(gameService, gameOut, gameListOut); 
        let startGameIn = new StartGameIn(gameService, gameOut);
        let lockLineIn = new LockLineIn(gameService, gameOut);
        let spectrumIn = new SpectrumIn(gameService, gameOut);
        const loseIn = new LoseIn(gameService, gameOut);

        this.io.on("connection", socket => {
            gameListIn.initConnection(socket);
            createGameIn.initConnection(socket);
            gameIn.initConnection(socket);
            joinGameIn.initConnection(socket);
            leaveGameIn.initConnection(socket);
            kickPlayerIn.initConnection(socket);
            disconnectIn.initConnection(socket);
            startGameIn.initConnection(socket);
            lockLineIn.initConnection(socket);
            spectrumIn.initConnection(socket);
            loseIn.initConnection(socket);

            console.log(`Socket ${socket.id} has connected`);
        });
        this.http.listen(4444, () => {
            console.log('Listening on port 4444');
        });
    }
}


new Application().run();

