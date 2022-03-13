
class Player {

    constructor(name , isOwner, socket) {
        this.id = socket.id,
        this.name = name,
        this.isOwner = isOwner
        this.lockline = 0;
        this.spectrum = [0 , 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
}

module.exports.Player = Player;
