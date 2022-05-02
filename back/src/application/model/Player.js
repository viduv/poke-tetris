let gen = require('random-seed');

class Player {

    constructor(name, isOwner, socket, seedTime) {
        this.id = socket.id;
        this.name = name;
        this.isOwner = isOwner;
        this.lockline = 0;
        this.spectrum = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.hasLoose = false;
        this.seed = gen.create(seedTime);
    }
}

module.exports.Player = Player;
