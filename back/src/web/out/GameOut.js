class GameOut {

    constructor(io) {
        this.io = io;
    }

    refreshGame(game) {
        this.io.to(game.id).emit("game", game);
    }

    sendGameId(socket, game) {
        this.io.to(socket.id).emit("gameId", {
            id: game.id.toString(),
            error: false
        });
    }
    sendGameIsFull(socket) {
        this.io.to(socket.id).emit("gameId", {
            id : "This game is actually Full, Please Try again later",
            error: true
        })
    }
    sendGameIsRunning(socket){
        this.io.to(socket.id).emit("gameId", {
            id : "This game is actually running, Please Wait it to finish",
            error : true
        })
    }
}

module.exports.GameOut = GameOut;
