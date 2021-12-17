const { Player } = require("../model/Player");

class PlayerService {
    
    players = []

    constructor() {}

    addPlayer(name, isOwner) {
        let newPlayer = new Player(name, isOwner);
        this.players.push(newPlayer);
        return newPlayer
    }

    getPlayer(id){
        return this.players.filter(item => item.id === id)
    }

    getPlayers(){
        return this.players
    }

}

module.exports.PlayerService = PlayerService;