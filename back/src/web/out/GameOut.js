class GameOut {

    constructor(io) {
        this.io = io;
    }

    // gameId Socket
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

    // game socket
    refreshGame(game) {
        this.io.to(game.id).emit("game", game);
    }
    // TODO USE THIS METHOD TO HANDLE ERROR MESSAGE WITH INCORRECT URL/ID ACCESS FROM URL
    sendGameIdOrUrlIsNotCorrect(game){
        this.io.to(game.id).emit("game",)
    }
}

module.exports.GameOut = GameOut;
