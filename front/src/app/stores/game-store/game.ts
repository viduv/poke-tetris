import { Player } from "../../model/player"

export interface Game {
  gameId: string,
  gameName: string,
  ownerName: string, 
  isPublic: boolean, 
  gameState: string, 
  player: Array<Player> 
}

