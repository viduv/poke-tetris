import { createReducer, on } from '@ngrx/store';
import { GameState } from "./game.state";
import * as GameAction from './game.actions';

export const initialState: GameState = {
  game: {
    id: "",
    name: "",
    gameState: "",
    isPublic: true,
    players: [],
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
  })),
  on(GameAction.populateSelf, (state, self) => ({
    ...state,
    self: self.self,
  })),
  on(GameAction.populateGame, (state, game) => ({
    ...state,
    game: game.game,
  }))
);
