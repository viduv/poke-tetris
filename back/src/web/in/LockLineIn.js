class LockLineIn {
	constructor(gameService, gameOut) {
	    this.gameService = gameService;
	    this.gameOut = gameOut;
	}
    
	initConnection(socket) {
	    socket.on("lockLine", (data) => {
		let game = this.gameService.getGame(data.gameId);
		game = this.gameService.addLockLine(data.lockline, game, socket.id)
		this.gameOut.refreshGame(game);
	    });
	}
    }
    
    module.exports.StartGameIn = LockLineIn;
    