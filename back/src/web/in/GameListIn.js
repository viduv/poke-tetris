class GameListIn {
    GameListOut;

    constructor(gameListOut) {
        this.GameListOut = gameListOut;
    }

    initConnection(socket) {
        socket.on("gamesList", () => {
            this.GameListOut.initConnection();
        });
    }
}

module.exports.GameListIn = GameListIn;