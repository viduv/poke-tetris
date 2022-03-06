class DisconnectIn {
	constructor(gameService, gameOut, gameListOut) {
		this.gameOut = gameOut;
		this.gameService = gameService;
		this.gameListOut = gameListOut;
	}

	initConnection(socket) {
		socket.on("disconnect", () => {
			console.log("DISCONNECT")
			// check if the player id is on the Game, return FALSE if not
			var game = this.gameService.checkGameUser(socket.id)
			if(game != "FALSE"){
				// Change IsOwner player if the player that leave is owner of the game
				if(Object.keys(game.players).length > 1){
					game.players.map(player => {
					if(player.id === socket.id && player.isOwner){
						for (var i = 0; i < Object.keys(game.players).length; i++) {
							if (!game.players[i].isOwner) {
								game.players[i].isOwner = true
								break;
						}
					}       
					}
				})

				game.players = game.players.filter(player => player.id !== socket.id);
				this.gameService.saveGame(game);
				this.gameOut.refreshGame(game);
			}
				else {
					// delete Game if the player is alone
					this.gameService.deleteGame(game.id);
					// refresh list for user that try to find games
					this.gameListOut.refreshGameList();
				}
			}   
		})
	}
}
	module.exports.DisconnectIn = DisconnectIn;
