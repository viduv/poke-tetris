class CreateGameIn {
	GameListOut;
	GameService;
	PlayerService;
    
	constructor(gameListOut, gameService, playerService) {
	    this.GameListOut = gameListOut;
	    this.GameService = gameService;
	    this.PlayerService = playerService;
	}
    
	initConnection(socket) {
	    socket.on("createGame", (data) => {
		    console.log(data)
		this.GameService.addGame(data.gameName, data.playerName, this.PlayerService, data.gameIsPublic)
		this.GameListOut.refreshGameList();
	    });
	}
    }
    
    module.exports.CreateGameIn = CreateGameIn;