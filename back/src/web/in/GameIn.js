class GameIn {
    
	constructor() {
	}
    
	initConnection(socket) {
	    socket.on("Game", (data) => {
	    });
	}
    }
    
    module.exports.GameIn = GameIn;