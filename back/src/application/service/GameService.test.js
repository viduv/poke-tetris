const {GameService} = require("../service/GameService");

test('add a Game', () => {
	gameServ = new GameService
	expect(gameServ.games.length).toBe(0);
	gameServ.addGame("antoineGame", "antoine", true, { id: "555", name: "socket"})
	expect(gameServ.games.length).toBe(1);
})

test('get Game by id', () => {
	gameServ = new GameService
	gameServ.addGame("antoineGame", "antoine", true, { id: "555", name: "socket"})
	game = gameServ.addGame("etienneGame", "etienne", true, { id: "555", name: "socket"})
	expect(gameServ.games.length).toBe(2);
	expect(gameServ.getGame("idthatnotexist")).toStrictEqual("this game does not exit or your url is not correctly formated")
	game1 = gameServ.getGame(game.id)
	expect(game1.id).toBe(game.id);
})

test('get Games', () => {
	gameServ = new GameService
	gameServ.addGame("antoineGame", "antoine", true, { id: "555", name: "socket"})
	expect(gameServ.getGames().length).toBe(1)
})

test('Delete Game', () => {
	gameServ = new GameService
	gameServ.addGame("antoineGame", "antoine", true, { id: "555", name: "socket"})
	game = gameServ.addGame("etienneGame", "etienne", true, { id: "555", name: "socket"})
	expect(gameServ.games.length).toBe(2);
	gameServ.deleteGame(game.id)
	expect(gameServ.games.length).toBe(1);
})

test('Test If User is in the Game', () => {
	gameServ = new GameService
	gameServ.addGame("antoineGame", "antoine", true, { id: "555", name: "socket"})
	game = gameServ.addGame("etienneGame", "etienne", true, { id: "554", name: "socket"})
	expect(gameServ.checkGameUser("badId")).toStrictEqual("FALSE")
	expect(gameServ.checkGameUser("554").id).toBe(game.id)
})