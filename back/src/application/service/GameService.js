const { Game } = require("../model/Game");
class GameService {
    
    games = []

    constructor() {}

    addGame(name, playername, playerservice) {
        let newGame = new Game(name, "CREATE", playerservice.addPlayer(playername, true))
        this.games.push(newGame)
        return newGame
    }

    getGame(id){
        return this.games.filter(item => item.id === id)
    }

    getGames(){
        return this.games
    }
}

module.exports.GameService = GameService;