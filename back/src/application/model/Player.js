
class Player {

    constructor(name , isOwner, socket) {
        this.id = socket.id,
        this.name = name,
        this.isOwner = isOwner,
        this.lockline = 0,
        this.spectrum = [0 , 0, 0, 0, 0, 0, 0, 0, 0, 0],
        this.hasLoose = false
    }
}

module.exports.Player = Player;
