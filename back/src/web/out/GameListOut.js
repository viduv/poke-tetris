class GameListOut {

    io;
    GameService;

    constructor(io, GameService) {
        this.io = io;
        this.GameService = GameService;
    }

    initConnection() {
        this.io.emit("gamesList", this.GameService.getGames().map( game => {
            gameId : game.id
            gameName : game.gameName
            ownerName : game.players.find(player => player.isOwner).name
        }));
    }

}

module.exports.GameListOut = GameListOut;