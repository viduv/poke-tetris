


class StartGameIn {
    constructor(gameService, gameOut) {
        this.gameService = gameService;
        this.gameOut = gameOut;
    }

    initConnection(socket) {
        socket.on("startGame", (data) => {
            let game = this.gameService.getGame(data.gameId);
            game.startGame();
            game.seedTime = new Date().getTime()
	//		game.seedTime = gen.create(rand)
    //        console.log(game.seed(6))
            this.gameOut.refreshGame(game);
        });
    }
}

module.exports.StartGameIn = StartGameIn;
