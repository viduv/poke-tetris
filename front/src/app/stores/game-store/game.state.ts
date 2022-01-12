import { Game } from "./game"
import { Self} from "./self"

export interface GameState {
  game: Game;
  self: Self;
}
export const key = "Game"
