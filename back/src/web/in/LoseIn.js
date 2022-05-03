class LoseIn {
    constructor(gameService, gameOut, winnerOut, nextPieceOut) {
        this.gameService = gameService;
        this.gameOut = gameOut;
        this.winnerOut = winnerOut;
        this.nextPieceOut = nextPieceOut;
    }

    initConnection(socket) {
        socket.on("lose", (data) => {
            console.log("LOOSSE")
            let game = this.gameService.getGame(data.gameId);
            let response = this.gameService.addPlayerLoose(game, socket.id)
            if (response.gameContinue) {
                this.gameOut.refreshGame(response.game);
            } else {
                let newGame = this.gameService.rebootGame(game);
                // add socket for winner Pop Up
                if (response.hasWinner) {
                    this.winnerOut.sendWinner(response.playerwin)
                }
                this.gameOut.refreshGame(newGame)
                newGame.players.forEach(player => this.nextPieceOut.sendNextPiece(player.id, player.seed(7)));
            }
        });
    }
}

module.exports.LoseIn = LoseIn;
    