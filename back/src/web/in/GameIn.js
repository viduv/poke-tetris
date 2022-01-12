const {Game} = require("../../application/model/Game");

class GameIn {

    constructor(gameOut, gameService) {
        this.gameOut = gameOut;
        this.gameService = gameService;
    }

    initConnection(socket) {
        socket.on("game", (data) => {
            let game = this.gameService.getGame(data.id);
            game.connect(socket);
            this.gameOut.refreshGame(game);
        });
    }
}

module.exports.GameIn = GameIn;
