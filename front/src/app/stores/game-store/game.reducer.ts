import { createReducer, on } from '@ngrx/store';
import { GameState } from "./game.state";
import * as GameAction from './game.actions';

export const initialState: GameState = {
  game: {
    gameId: "",
    gameName: "",
    gameState: "",
    ownerName: "",
    isPublic: true,
    player: [],
  },
  self: {
    id: "",
    name: "",
    isOwner: true,
  }
}

export const GameReducer = createReducer(initialState, 
  on(GameAction.flushState, (state) => ({
    ...state,
    games: []
  })),
  on(GameAction.populateSelf, (state, self) => ({
    ...state,
    self: self.self,
  }))
);
