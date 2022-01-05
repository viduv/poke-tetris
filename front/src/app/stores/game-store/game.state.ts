import { Game } from "./game"
import { Self} from "../../model/self"

export interface GameState {
  game: Game;
  self: Self;
}
export const key = "Game"
