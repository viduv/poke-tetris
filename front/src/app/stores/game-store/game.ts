import { Player } from "../../model/player"

export interface Game {
  id: string,
  name: string,
  isPublic: boolean,
  difficulty: "100" | "200" | "300";
  gameState: string,
  players: Array<Player>
}

