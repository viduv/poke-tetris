class SelfOut {
    io;

    constructor(io) {
        this.io = io;
    }

    sendSelf(socket, player) {
        this.io.to(socket.id).emit("self", {
            id: player.id,
            name: player.name,
            isOwner: player.isOwner
        });
    }
}

module.exports.SelfOut = SelfOut;
