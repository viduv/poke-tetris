const {Player} = require("../../application/model/Player");

class JoinGameIn {
    constructor(gameService, selfOut, gameOut, nextPieceOut) {
        this.gameService = gameService;
        this.SelfOut = selfOut;
        this.gameOut = gameOut;
        this.nextPieceOut = nextPieceOut;
    }

    initConnection(socket) {
        socket.on("joinGame", (data) => {
            let game = this.gameService.getGame(data.gameId);
            // Game is Full Error
            if (game && game.players.length >= 5)
                this.gameOut.sendGameIsFull(socket)

            // Game is Running
            else if (game && game.gameState !== "CREATE")
                this.gameOut.sendGameIsRunning(socket)

            // Create Player + return Self + Game Id
            else {
                if(game){
                let player = new Player(data.playerName, false, socket, game.seedTime);
                if (game) {
                    game.players.push(player);
                    this.gameService.saveGame(game);
                    this.SelfOut.sendSelf(socket, player);
                    this.gameOut.sendGameId(socket, game);
                    this.nextPieceOut.sendNextPiece(socket.id, player.seed(7));
                }
            }
        }
        });
    }
}

module.exports.JoinGameIn = JoinGameIn;
