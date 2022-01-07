class SelfOut {
	io;
    
	constructor(io) {
	    this.io = io;
	}
    
	sendSelf(socket, player, from) {
	    if(from == "createGame"){
	    	this.io.to(socket.id).emit("createGame", 
	    	{
			id : player[0].id, 
			name : player[0].name, 
			isOwner: player[0].isOwner
	    	});
	    }
	    else{
		this.io.to(socket.id).emit("joinGame",
		{
			id : player.id, 
			name : player.name, 
			isOwner: player.isOwner
		})
	    }
}
}
    
module.exports.SelfOut = SelfOut;