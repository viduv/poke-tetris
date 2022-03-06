const {Game} = require("../../application/model/Game");

class GameIn {

    constructor(gameOut, gameService) {
        this.gameOut = gameOut;
        this.gameService = gameService;
    }

    initConnection(socket) {
        socket.on("game", (data) => {
            let game = this.gameService.getGame(data.id);
            // Error Handling
            if(game instanceof String || typeof game === 'string'){
            }
            // Normal process
            else
            {
                game.connect(socket);
                this.gameOut.refreshGame(game);
            }
        });
        socket.on("disconnect", function (){
            console.log("DISCONNECT")
            console.log(this.id); // this.id is the 'id' of the socket that got disconnected
        });
    }
}

module.exports.GameIn = GameIn;
