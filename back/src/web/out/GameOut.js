class GameOut {

    constructor(io) {
        this.io = io;
    }

    refreshGame(game) {
        this.io.to(game.id).emit("game", game);
    }

    sendGameId(socket, game) {
        this.io.to(socket.id).emit("gameId", {
            id: game.id.toString()
        });
    }
}

module.exports.GameOut = GameOut;
