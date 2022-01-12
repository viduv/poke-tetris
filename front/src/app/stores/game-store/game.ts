import { Player } from "../../model/player"

export interface Game {
  id: string,
  name: string,
  isPublic: boolean,
  gameState: string,
  players: Array<Player>
}

