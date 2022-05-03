class DisconnectIn {
    constructor(gameService, gameOut, gameListOut, winnerOut, nextPieceOut) {
        this.gameOut = gameOut;
        this.gameService = gameService;
        this.gameListOut = gameListOut;
        this.winnerOut = winnerOut;
        this.nextPieceOut = nextPieceOut
    }

    initConnection(socket) {
        socket.on("disconnect", () => {
            console.log("DISCONNECT")
            // check if the player id is on the Game, return FALSE if not
            var game = this.gameService.checkGameUser(socket.id)
            if (game != "FALSE") {
                // Change IsOwner player if the player that leave is owner of the game
                if (Object.keys(game.players).length > 1) {
                    game.players.map(player => {
                        if (player.id === socket.id && player.isOwner) {
                            for (var i = 0; i < Object.keys(game.players).length; i++) {
                                if (!game.players[i].isOwner) {
                                    game.players[i].isOwner = true
                                    break;
                                }
                            }
                        }
                    })
                    let resp = this.gameService.addPlayerLoose(game, socket.id)
                    // If we have Winner and the game is on PLAY mode
                    if (resp.hasWinner && game.gameState === "PLAY") {
                        let newGame = this.gameService.rebootGame(game, socket.id)
                        this.winnerOut.sendWinner(socket, " Vous avez gagné la partie par forfait", resp.playerwin)
                        console.log(newGame)
                        this.gameOut.refreshGame(newGame);
                        newGame.players.forEach(player => this.nextPieceOut.sendNextPiece(player.id, player.seed(7)));
                    } else {
                        game.players = game.players.filter(player => player.id !== socket.id);
                        this.gameService.saveGame(game);
                        this.gameOut.refreshGame(game);
                    }
                } else {
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
