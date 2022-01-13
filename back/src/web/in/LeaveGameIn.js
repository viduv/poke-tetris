class LeaveGameIn {
    constructor(gameService, gameOut) {
        this.gameService = gameService;
        this.gameOut = gameOut;
    }

    initConnection(socket) {
        socket.on("leaveGame", (data) => {
            let game = this.gameService.getGame(data.gameId);
            game.disconnect(socket);
            game.players = game.players.filter(player => player.id !== data.playerId);
            this.gameService.saveGame(game);
            this.gameOut.refreshGame(game);
        })
    }
}

module.exports.LeaveGameIn = LeaveGameIn;
