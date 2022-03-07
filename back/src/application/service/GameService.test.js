const {GameService} = require("../service/GameService");
const {Game} = require("../model/Game");

test('add a Game', () => {
	gameServ = new GameService
	expect(gameServ.games.length).toBe(0);
	gameServ.addGame("antoineGame", "antoine", true, { id: "555", name: "socket"})
	expect(gameServ.games.length).toBe(1);
})

test(' get Game by id', () => {
	gameServ = new GameService
	gameServ.addGame("antoineGame", "antoine", true, { id: "555", name: "socket"})
	game = gameServ.addGame("etienneGame", "etienne", true, { id: "555", name: "socket"})
	expect(gameServ.games.length).toBe(2);
	expect(gameServ.getGame("idthatnotexist")).toStrictEqual("this game does not exit or your url is not correctly formated")
	game1 = gameServ.getGame(game.id)
	expect(game1.id).toBe(game.id);
})