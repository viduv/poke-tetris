class LoseIn {
	constructor(gameService, gameOut) {
	    this.gameService = gameService;
	    this.gameOut = gameOut;
	}
    
	initConnection(socket) {
	    socket.on("lose", (data) => {
		let game = this.gameService.getGame(data.gameId);
		let response = this.gameService.addPlayerLoose(game, socket.id)
		if(response.gameContinue){
			this.gameOut.refreshGame(response.game);
		}
		else{
			let newGame = this.gameService.rebootGame(game)
			// add socket for winner Pop Up
			if(response.hasWinner){
				console.log("WINNNER IS ..." + response.playerwin)
			}
			this.gameOut.refreshGame(newGame)
		}
	    });
	}
    }

    module.exports.LoseIn = LoseIn;
    