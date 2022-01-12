class GameListOut {

    constructor(io, GameService) {
        this.io = io;
        this.GameService = GameService;
    }

    initConnection(socket) {
        this.io.to(socket.id).emit("gamesList", this.GameService.getGames().map( game => {
            let games = {}
            games["gameId"] = game.id;
            games["gameName"] = game.name;
            games["ownerName"] = game.players.find(player => player.isOwner).name;
            games["isPublic"] = game.isPublic;
            games["gameState"] = game.gameState;
            return games;
        }));
    }
    // refresh Games data when new Game is created
    refreshGameList() {
        this.io.emit("gamesList", this.GameService.getGames().map( game => {
            let games = {}
            games["gameId"] = game.id;
            games["gameName"] = game.name;
            games["ownerName"] = game.players.find(player => player.isOwner).name;
            games["isPublic"] = game.isPublic;
            games["gameState"] = game.gameState;
            return games;
        }));
    }

}

module.exports.GameListOut = GameListOut;
