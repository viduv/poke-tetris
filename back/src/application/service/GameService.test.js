const {GameService} = require("../service/GameService");
const {Player} = require("../../application/model/Player");

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

test('Add Lockline', () => {
	gameServ = new GameService
	let game = gameServ.addGame("antoineGame", "antoine", true, { id: "555", name: "socket"})
	let player = new Player("Etienne", false, {id : "444"});
	player.spectrum = [ 3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
	game.players.push(player)
	game = gameServ.addLockLine(3, game, "555")
	expect(game.players[1].spectrum).toStrictEqual([6, 6, 6, 6, 6, 6, 6, 6, 6, 6])
	expect(game.players[0].spectrum).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
})

test('Add Spectrum', () => {
	gameServ = new GameService
	let game = gameServ.addGame("antoineGame", "antoine", true, { id: "555", name: "socket"})
	game = gameServ.refreshSpectrum("555", [6, 6, 6, 6, 6, 6, 6, 6, 6, 6], game)
	expect(game.players[0].spectrum).toStrictEqual([6, 6, 6, 6, 6, 6, 6, 6, 6, 6])
})

test(' Lose Game', () => {
	gameServ = new GameService
	let game = gameServ.addGame("antoineGame", "antoine", true, { id: "555", name: "socket"})

	// test With One Player
	let resp = gameServ.addPlayerLoose(game, "555")
	expect(resp.playerwin).toStrictEqual("alone")
	expect(resp.hasWinner).toStrictEqual(false)
	expect(resp.gameContinue).toStrictEqual(false)

	// Test With 2 Players
	let player = new Player("Etienne", false, {id : "444"});
	game.players.push(player)
	let resp1 = gameServ.addPlayerLoose(game, "555")
	expect(resp1.playerwin.id).toStrictEqual("444")
	expect(resp1.hasWinner).toStrictEqual(true)
	expect(resp1.gameContinue).toStrictEqual(false)

	// Test With 3 or More Players with no winner
	let player1 = new Player("Fabrice", false, {id : "333"});
	game.players.push(player1)
	let resp2 = gameServ.addPlayerLoose(game, "555")
	expect(resp2.playerwin).toStrictEqual(undefined)
	expect(resp2.hasWinner).toStrictEqual(false)
	expect(resp2.gameContinue).toStrictEqual(true)
	expect(resp2.game.players[0].hasLoose).toStrictEqual(true)
	expect(resp2.game.players[1].hasLoose).toStrictEqual(false)
	expect(resp2.game.players[2].hasLoose).toStrictEqual(false)

	// Test With 3 or More Player with a winner
	let game1 = gameServ.addGame("antoineGame", "antoine", true, { id: "555", name: "socket"})
	let player2 = new Player("Fabrice", false, {id : "333"});
	let player3 = new Player("Etienne", false, {id : "444"});
	player2.hasLoose = true;
	game1.players.push(player2);
	game1.players.push(player3);
	let resp3 = gameServ.addPlayerLoose(game1, "555")
	expect(resp3.playerwin.id).toStrictEqual("444")
	expect(resp3.hasWinner).toStrictEqual(true)
	expect(resp3.gameContinue).toStrictEqual(false)
})