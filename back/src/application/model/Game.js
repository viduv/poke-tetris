const { Player } = require("../model/Player");
const { v4: uuidv4 } = require('uuid');

class Game {
    id;
    name;
    gameState;
    players;

    constructor(name, gameState, player) {
        this.id = uuidv4();
        this.name = name
        this.gameState = gameState
        this.players = [{id: player.id, name : player.name, isOwner : true}]
    }

}

module.exports.Game = Game;