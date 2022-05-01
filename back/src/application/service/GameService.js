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

    rebootGame(game){
        game.gameState = "CREATE",
        game.seed = ""
        game.players.map( player => {
            player.lockline = 0
            player.spectrum = [0 , 0, 0, 0, 0, 0, 0, 0, 0, 0]
            player.hasLoose = false
        })
        return game
    }

    addPlayerLoose(game, playerId) {
        let hasloose = 1
        let playerWin = ""
        if(game.players.length === 1){
            return {playerwin: "alone", hasWinner : false, gameContinue : false, game : ""}
        }
        else if(game.players.length === 2){
            game.players.map( player => {
                if(player.id !== playerId){
                    playerWin = player
                }
            })
            return {playerwin : playerWin, hasWinner : true, gameContinue : false, game : ""}
        }
        else {
            game.players.map(player => {
                if(player.id === playerId){
                    player.hasLoose = true
                }
                // count number of player that have already loose
                if(player.hasLoose){
                    hasloose += 1;
                }
            })
        if(game.players.length === hasloose){
            game.players.map( player => {
                if(!player.hasLoose){
                    playerWin = player
                }
            })
            return {playerwin : playerWin, hasWinner : true, gameContinue : false, game : ""}
        }
        else {
            return {palyerwin : "", hasWinner : false, gameContinue : true, game : game}
        }
    }
}


    // Add Line to spectrum
    addLockLine(addlockline, game, playerId){
        game.players.map(player => {
            if(player.id !== playerId){
                player.lockline += addlockline
                player.spectrum = player.spectrum.map(value => value + player.lockline)
            }
        })
        return game;
    }

    refreshSpectrum(playerId, spectrum, game){
        game.players.map( player => {
            if(player.id === playerId){
                player.spectrum = spectrum.map(value => value + player.lockline)
            }
        })
        return game;
    }

    getGame(id) {
        if(this.games.find(item => item.id === id) != undefined){
            return this.games.find(item => item.id === id);
        }
        else{
            console.log("ERROR ON gameId")
            return "this game does not exit or your url is not correctly formated"
        }
    }

    getGames() {
        return this.games;
    }

    deleteGame(gameId){
        this.games = this.games.filter(item => item.id != gameId)
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
