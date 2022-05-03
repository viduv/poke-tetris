class StartGameIn {
    constructor(gameService, gameOut, nextPieceOut) {
        this.gameService = gameService;
        this.gameOut = gameOut;
        this.nextPieceOut = nextPieceOut;

    }

    initConnection(socket) {
        socket.on("startGame", (data) => {
            let game = this.gameService.getGame(data.gameId);
            if (game) {
                game.startGame();
                this.gameOut.refreshGame(game);
                game.players.forEach(player => this.nextPieceOut.sendNextPiece(player.id, player.seed(7)));
            }
        });
    }
}

module.exports.StartGameIn = StartGameIn;
