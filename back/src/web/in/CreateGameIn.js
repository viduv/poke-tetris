class CreateGameIn {

    constructor(gameListOut, gameService, selfOut, gameOut) {
        this.GameListOut = gameListOut;
        this.GameService = gameService;
        this.SelfOut = selfOut;
        this.gameOut = gameOut;
    }

    initConnection(socket) {
        socket.on("createGame", (data) => {
            // Create Game
            let game = this.GameService.addGame(data.gameName, data.playerName, data.gameIsPublic)
            // Refresh Game List for people on the room
            this.GameListOut.refreshGameList();
            // Send Self Data
            this.SelfOut.sendSelf(socket, game.players[0]);
            // Send game id
            this.gameOut.sendGameId(socket, game);
        });
    }
}

module.exports.CreateGameIn = CreateGameIn;
