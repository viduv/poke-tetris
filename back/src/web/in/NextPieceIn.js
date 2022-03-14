var gen = require('random-seed'); 

class NextPieceIn {

    constructor(nextPieceOut, seed) {
        this.nextPieceOut = nextPieceOut;
	this.seed = seed;
	this.rand = gen.create(seed)
    }

    initConnection(socket) {
        socket.on("nextPiece", (data) => {
		if(data.gameStart){
			this.seed = new Date().getTime()
			this.rand = gen.create(seed)
		}
		else{
			this.nextPieceOut.sendNextPiece(socket, this.rand(8))
		}
	})
    }
}

module.exports.NextPieceIn = NextPieceIn;
