const {Game} = require("../model/Game");
const {Player} = require("../model/Player");

class GameService {

    constructor() {
        this.games = [];
    }

    addGame(name, playerName, isPublic, socket) {
        let newGame = new Game(name, "CREATE", new Player(playerName, true, socket), isPublic);
        this.games.push(newGame);
        return newGame;
    }

    getGame(id) {
        if(this.games.find(item => item.id === id) != undefined){
            return Object.assign(new Game(), this.games.find(item => item.id === id));
        }
        else
            return "this game does not exit or your url is not correctly formated"
    }

    getGames() {
        return this.games;
    }

    deleteGame(gameId){
        this.games = this.games.filter(item => item.id != gameId)
        console.log(this.games)
    }
    checkGameUser(playerId){
        var bool = "False"
        var findGame = "FALSE"
        this.games.map(game =>
            {
                game.players.map(player => {
                    if(player.id === playerId){
                        bool = "True"
                    }
                if(bool == "True"){
                    findGame = game
                }
            })
            })
        return findGame
    }

    saveGame(game) {
        this.games = this.games.filter(g => g.id !== game.id);
        this.games.push(game);
    }
}

module.exports.GameService = GameService;
