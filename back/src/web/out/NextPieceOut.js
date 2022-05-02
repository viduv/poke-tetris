class NextPieceOut {

    constructor(io) {
        this.io = io;
    }

    sendNextPiece(socketId, piece) {
        this.io.to(socketId).emit("nextPiece", piece);
    }
}

module.exports.NextPieceOut = NextPieceOut;