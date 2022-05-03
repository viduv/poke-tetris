class WinnerOut {
	io;
    
	constructor(io) {
	    this.io = io;
	}
    
	sendWinner(player) {
		console.log("EMIT WIN")
	    this.io.to(player.id).emit("winner", {});
	}
    }
	module.exports.WinnerOut = WinnerOut;
