class SelfOut {
	io;
    
	constructor(io) {
	    this.io = io;
	}
    
	sendSelf(socket, player, from) {
	    this.io.to(socket.id).emit("createGame", 
	    {
		id : player[0].id, 
		name : player[0].name, 
		isOwner: player[0].isOwner
	    });
	}
}
    
    module.exports.SelfOut = SelfOut;