let gen = require('random-seed'); 


class StartGameIn {
    constructor(gameService, gameOut) {
        this.gameService = gameService;
        this.gameOut = gameOut;
    }

    initConnection(socket) {
        socket.on("startGame", (data) => {
            let game = this.gameService.getGame(data.gameId);
            let rand = new Date().getTime()
            game.startGame();
			game.seed = gen.create(rand)
            this.gameOut.refreshGame(game);
        });
    }
}

module.exports.StartGameIn = StartGameIn;
