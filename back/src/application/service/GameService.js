const {Game} = require("../model/Game");
const {Player} = require("../model/Player");

class GameService {

    constructor() {
        this.games = [];
    }

    addGame(name, playerName, isPublic) {
        let newGame = new Game(name, "CREATE", new Player(playerName, true), isPublic);
        this.games.push(newGame);
        return newGame;
    }

    getGame(id) {
        return Object.assign(new Game(), this.games.find(item => item.id === id));
    }

    getGames() {
        return this.games;
    }

    saveGame(game) {
        this.games = this.games.filter(g => g.id !== game.id);
        this.games.push(game);
    }
}

module.exports.GameService = GameService;
