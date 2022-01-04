class CreateGameIn {
	GameListOut;
	GameService;
    
	constructor(gameListOut, GameService) {
	    this.GameListOut = gameListOut;
	    this.GameService = GameService;
	}
    
	initConnection(socket) {
	    socket.on("createGame", (data) => {
		    console.log(data)
	//	this.GameService.addGame()
	//	this.GameListOut.refreshGameList();
	    });
	}
    }
    
    module.exports.CreateGameIn = CreateGameIn;