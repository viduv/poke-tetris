const { v4: uuidv4 } = require('uuid');

class Player {
    id;
    name;
    isOwner = false;

    constructor(name , isOwner) {
        this.id = uuidv4(),
        this.name = name,
        this.isOwner = isOwner
    }
}

module.exports.Player = Player;