const {PlayerService} = require("../service/PlayerService");
const {Player} = require("../model/Player");


test('Get Players Function', () => {
	playerserv = new PlayerService;
	playerserv.players = ["antoine", "etienne"]
	expect(playerserv.getPlayers()).toStrictEqual(["antoine", "etienne"]);
      });

test("Get Player Via Id Function", () => {
	playerserv = new PlayerService;
	playerserv.players = [
		{ 
			id : "1",
			name: "antoine",
		},
		{
			id: "2",
			name: "etienne",
		}
	]
	expect(playerserv.getPlayer("1")).toStrictEqual(
		[{
			id : "1",
			name: "antoine",
		}])
})