const {v4: uuidv4} = require('uuid');

class Game {

    constructor(name, gameState, isPublic, difficulty) {
        this.id = uuidv4();
        this.name = name;
        /**
         * CREATE, PLAY
         */
        this.gameState = gameState;
        this.isPublic = isPublic;
        this.difficulty = difficulty;
        this.players = [];
        this.seedTime = new Date().getTime();
    }

    connect(socket) {
        socket.join(this.id);
    }

    disconnect(socket) {
        socket.leave(this.id);
    }

    startGame() {
        this.gameState = "PLAY";
    }
}

module.exports.Game = Game;
