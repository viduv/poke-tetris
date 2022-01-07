class CreateGameIn {
	GameListOut;
	GameService;
	PlayerService;
	SelfOut;
    
	constructor(gameListOut, gameService, playerService, selfOut) {
	    this.GameListOut = gameListOut;
	    this.GameService = gameService;
	    this.PlayerService = playerService;
	    this.SelfOut = selfOut;
	}
    
	initConnection(socket) {
	    socket.on("createGame", (data) => {
		// Create Game
		let game = this.GameService.addGame(data.gameName, data.playerName, this.PlayerService, data.gameIsPublic)
		// Refresh Game List for people on the room
		this.GameListOut.refreshGameList();
		// Send Self Data 
		this.SelfOut.sendSelf(socket, game.players, "createGame" )
	    });
	}
    }
    
    module.exports.CreateGameIn = CreateGameIn;