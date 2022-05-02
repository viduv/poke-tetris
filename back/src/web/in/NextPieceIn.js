let gen = require('random-seed'); 


class NextPieceIn {

    constructor(nextPieceOut, gameService) {
        this.nextPieceOut = nextPieceOut;
	this.gameService = gameService
    }

    initConnection(socket) {
        socket.on("nextPiece", (data) => {
		let game = this.gameService.getGame(data.gameId);
        let seed = gen.create(game.seedTime);
		this.nextPieceOut.sendNextPiece(socket, seed(6))
	})
    }
}

module.exports.NextPieceIn = NextPieceIn;
