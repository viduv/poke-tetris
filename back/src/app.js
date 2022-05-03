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
const {NextPieceIn} = require('./web/in/NextPieceIn');
const {NextPieceOut} = require('./web/out/NextPieceOut');
const {WinnerOut} = require('./web/out/WinnerOut');
const {RedirectionOut} = require('./web/out/RedirectionOut');

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
        const nextPieceOut = new NextPieceOut(this.io);
        const gameService = new GameService();
        const gameListOut = new GameListOut(this.io, gameService)
        const gameListIn = new GameListIn(gameListOut)
        const selfOut = new SelfOut(this.io);
        const gameOut = new GameOut(this.io);
        const winnerOut = new WinnerOut(this.io);
        const createGameIn = new CreateGameIn(gameListOut, gameService, selfOut, gameOut, nextPieceOut);
        const joinGameIn = new JoinGameIn(gameService, selfOut, gameOut, nextPieceOut);
        const gameIn = new GameIn(gameOut, gameService);
        const leaveGameIn = new LeaveGameIn(gameService, gameOut, gameListOut);
        const kickPlayerIn = new KickPlayerIn(gameService, gameOut);
        const disconnectIn = new DisconnectIn(gameService, gameOut, gameListOut, winnerOut, nextPieceOut);
        const lockLineIn = new LockLineIn(gameService, gameOut);
        const spectrumIn = new SpectrumIn(gameService, gameOut);
        const loseIn = new LoseIn(gameService, gameOut, winnerOut, nextPieceOut);
        const startGameIn = new StartGameIn(gameService, gameOut, nextPieceOut);
        const nextPieceIn = new NextPieceIn(nextPieceOut, gameService);
        const redirectionOut = new RedirectionOut(this.io)

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
            nextPieceIn.initConnection(socket);

            // Launch Redirection to the home page
            redirectionOut.sendRedirectToHome(socket)

            console.log(`Socket ${socket.id} has connected`);
        });
        this.http.listen(4444, () => {
            console.log('Listening on port 4444');
        });
    }
}


new Application().run();

