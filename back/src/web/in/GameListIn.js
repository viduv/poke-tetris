class GameListIn {
    GameListOut;

    constructor(gameListOut) {
        this.GameListOut = gameListOut;
    }

    initConnection(socket) {
        socket.on("gamesList", () => {
            console.log( "GAMELIST SOCKET ON")
            this.GameListOut.initConnection();
        });
    }
}

module.exports.GameListIn = GameListIn;