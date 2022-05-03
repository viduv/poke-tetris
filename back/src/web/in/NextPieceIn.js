let gen = require('random-seed');


class NextPieceIn {

    constructor(nextPieceOut, gameService) {
        this.nextPieceOut = nextPieceOut;
        this.gameService = gameService
    }

    initConnection(socket) {
        socket.on("nextPiece", (data) => {
            let game = this.gameService.getGame(data.gameId);
            this.nextPieceOut.sendNextPiece(socket.id, game.players.find(player => player.id === socket.id).seed(7));
        })
    }
}

module.exports.NextPieceIn = NextPieceIn;
