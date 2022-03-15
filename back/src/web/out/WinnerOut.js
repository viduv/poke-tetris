class WinnerOut {
	io;
    
	constructor(io) {
	    this.io = io;
	}
    
	sendWinner(socket , message, player) {
	    this.io.to(socket.id).emit("winner", {
		id: player.id,
		message: message
	    });
	}
    }
	module.exports.WinnerOut = WinnerOut;
