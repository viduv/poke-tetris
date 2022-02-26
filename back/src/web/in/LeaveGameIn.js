class LeaveGameIn {
    constructor(gameService, gameOut) {
        this.gameService = gameService;
        this.gameOut = gameOut;
    }

    initConnection(socket) {
        socket.on("leaveGame", (data) => {
            let game = this.gameService.getGame(data.gameId);
            game.disconnect(socket);
            // Check If The player that leave the game is Owner and is not alone, if its the case give the owner to someone else
            if(Object.keys(game.players).length > 1){
                game.players.map(player => {
                    if(player.id === data.playerId && player.isOwner){
                        for (var i = 0; i < Object.keys(game.players).length; i++) {
                            if (!game.players[i].isOwner) {
                                game.players[i].isOwner = true
                                break;
                            }
                        }       
                    }
            })
        }
            game.players = game.players.filter(player => player.id !== data.playerId);
            this.gameService.saveGame(game);
            this.gameOut.refreshGame(game);
        })
    }
}

module.exports.LeaveGameIn = LeaveGameIn;
