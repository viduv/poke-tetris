class NextPieceOut {

	constructor(io) {
	    this.io = io;
	}
    
	sendNextPiece(socket, piece) {
	    this.io.to(socket.id).emit("nextPiece", piece);
	}
    }
    
module.exports.NextPieceOut = NextPieceOut;