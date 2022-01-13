const {Player} = require("../../application/model/Player");

class JoinGameIn {
    constructor(gameService, selfOut, gameOut) {
        this.gameService = gameService;
        this.SelfOut = selfOut;
        this.gameOut = gameOut;
    }

    initConnection(socket) {
        socket.on("joinGame", (data) => {
            let player = new Player(data.playerName, false);
            let game = this.gameService.getGame(data.gameId);
            if (game !== undefined) {
                game.players.push(player);
                this.gameService.saveGame(game);
                this.SelfOut.sendSelf(socket, player)
                this.gameOut.sendGameId(socket, game);
            }
        });
    }
}

module.exports.JoinGameIn = JoinGameIn;
