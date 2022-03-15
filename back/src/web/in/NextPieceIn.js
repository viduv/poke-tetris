class NextPieceIn {

    constructor(nextPieceOut, gameService) {
        this.nextPieceOut = nextPieceOut;
	this.gameService = gameService
    }

    initConnection(socket) {
        socket.on("nextPiece", (data) => {
		let game = this.gameService.getGame(data.gameId);
		this.nextPieceOut.sendNextPiece(socket, game.seed(6))
	})
    }
}

module.exports.NextPieceIn = NextPieceIn;
