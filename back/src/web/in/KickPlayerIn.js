class KickPlayerIn {
    constructor(gameService, gameOut) {
        this.gameOut = gameOut;
        this.gameService = gameService;
    }

    initConnection(socket) {
        socket.on("kickPlayer", (data) => {
            let game = this.gameService.getGame(data.gameId);
            game.players = game.players.filter(player => player.id !== data.kickPlayerId);
            this.gameService.saveGame(game);
            this.gameOut.refreshGame(game);
        })
    }
}

module.exports.KickPlayerIn = KickPlayerIn;
