const { v4: uuidv4 } = require('uuid');

class Player {

    constructor(name , isOwner) {
        this.id = uuidv4(),
        this.name = name,
        this.isOwner = isOwner
    }
}

module.exports.Player = Player;
