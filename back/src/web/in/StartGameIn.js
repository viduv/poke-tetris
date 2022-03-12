class StartGameIn {
    constructor(gameService, gameOut) {
        this.gameService = gameService;
        this.gameOut = gameOut;
    }

    initConnection(socket) {
        socket.on("startGame", (data) => {
            let game = this.gameService.getGame(data.gameId);
            game.startGame();
            this.gameOut.refreshGame(game);
            console.log("ok")
        });
    }
}

module.exports.StartGameIn = StartGameIn;
