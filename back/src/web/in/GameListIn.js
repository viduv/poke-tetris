class GameListIn {
    GameListOut;

    constructor(gameListOut) {
        this.GameListOut = gameListOut;
    }

    initConnection(socket) {
        socket.on("gamesList", () => {
            this.GameListOut.initConnection(socket);
        });
    }
}

module.exports.GameListIn = GameListIn;