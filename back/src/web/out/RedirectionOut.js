class RedirectionOut {
    io;

    constructor(io) {
        this.io = io;
    }

    sendRedirectToHome(socket) {
        this.io.to(socket.id).emit("redirect", { } );
    }
}

module.exports.RedirectionOut = RedirectionOut;
