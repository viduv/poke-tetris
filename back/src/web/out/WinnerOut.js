class WinnerOut {
	io;
    
	constructor(io) {
	    this.io = io;
	}
    
	sendWinner(player) {
	    this.io.to(player.id).emit("winner", {});
	}
    }
	module.exports.WinnerOut = WinnerOut;
