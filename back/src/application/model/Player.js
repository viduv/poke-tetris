
class Player {

    constructor(name , isOwner, socket) {
        this.id = socket.id,
        this.name = name,
        this.isOwner = isOwner
    }
}

module.exports.Player = Player;
