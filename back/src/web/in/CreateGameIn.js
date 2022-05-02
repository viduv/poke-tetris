class CreateGameIn {

    constructor(gameListOut, gameService, selfOut, gameOut, nextPieceOut) {
        this.GameListOut = gameListOut;
        this.GameService = gameService;
        this.SelfOut = selfOut;
        this.gameOut = gameOut;
        this.nextPieceOut = nextPieceOut;
    }

    initConnection(socket) {
        socket.on("createGame", (data) => {
            // Create Game
            let game = this.GameService.addGame(data.gameName, data.playerName, data.gameIsPublic, socket);
            // Refresh Game List for people on the room
            this.GameListOut.refreshGameList();
            // Send Self Data
            this.SelfOut.sendSelf(socket, game.players[0]);
            // Send game id
            this.gameOut.sendGameId(socket, game);
            this.nextPieceOut.sendNextPiece(game.players[0].id, game.players[0].seed(6));
        });
    }
}

module.exports.CreateGameIn = CreateGameIn;
