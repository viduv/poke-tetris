const {Player} = require("../model/Player");

class PlayerService {

    players = []

    constructor() {
    }

    getPlayer(id) {
        return this.players.filter(item => item.id === id)
    }

    getPlayers() {
        return this.players
    }

}

module.exports.PlayerService = PlayerService;
