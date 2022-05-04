class LeaveGameIn {
    constructor(gameService, gameOut, gameListOut) {
        this.gameService = gameService;
        this.gameOut = gameOut;
        this.gameListOut = gameListOut;
    }

    initConnection(socket) {
        socket.on("leaveGame", (data) => {
            let game = this.gameService.getGame(data.gameId);
            if(game) {
                game.disconnect(socket);
                // Check If The player that leave the game is Owner and is not alone, if its the case give the owner to someone else
                if (Object.keys(game.players).length > 1) {
                    game.players.map(player => {
                        if (player.id === data.playerId && player.isOwner) {
                            for (let i = 0; i < Object.keys(game.players).length; i++) {
                                if (!game.players[i].isOwner) {
                                    game.players[i].isOwner = true
                                    break;
                                }
                            }
                        }
                    })

                    game.players = game.players.filter(player => player.id !== data.playerId);
                    this.gameService.saveGame(game);
                    this.gameOut.refreshGame(game);

                } else {
                    // delete Game if the player is alone
                    this.gameService.deleteGame(data.gameId);
                    // refresh list for user that try to find games
                    this.gameListOut.refreshGameList();
                }
            }
        })
    }
}

module.exports.LeaveGameIn = LeaveGameIn;
