class JoinGameIn {
	GameService;
	PlayerService;
	SelfOut;
    
	constructor(gameService, playerService, selfOut) {
	    this.GameService = gameService;
	    this.PlayerService = playerService;
	    this.SelfOut = selfOut;
	}
    
	initConnection(socket) {
	    socket.on("joinGame", (data) => {
		this.player = this.GameService.addPlayerToGame(data.playerName, data.gameId, this.PlayerService)
		// Send Self Data
		this.SelfOut.sendSelf(socket, this.player, "joinGame" )
	    });
	}
    }
    
    module.exports.JoinGameIn = JoinGameIn;