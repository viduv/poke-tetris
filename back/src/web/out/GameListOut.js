class GameListOut {

    io;
    GameService;

    constructor(io, GameService) {
        this.io = io;
        this.GameService = GameService;
    }

    initConnection() {
        this.io.emit("gamesList", this.GameService.getGames().map( game => {
            let games = {}
            games["gameId"] = game.id
            games["gameName"] = game.name
            games["ownerName"] = game.players.find(player => player.isOwner).name
            games["isPublic"] = game.isPublic
            return games
        }));
    }

}

module.exports.GameListOut = GameListOut;