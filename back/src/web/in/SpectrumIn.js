class SpectrumIn {
	constructor(gameService, gameOut) {
	    this.gameService = gameService;
	    this.gameOut = gameOut;
	}
    
	initConnection(socket) {
	    socket.on("spectrum", (data) => {
			console.log(data.spectrum)
		let game = this.gameService.getGame(data.gameId);
		game = this.gameService.refreshSpectrum(socket.id, data.spectrum, game)
		this.gameOut.refreshGame(game);
	    });
	}
    }
    
    module.exports.SpectrumIn = SpectrumIn;
    