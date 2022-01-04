import { createReducer, on } from '@ngrx/store';
import {PreGameState} from "./pre-game.state";
import * as PreGameAction from './pre-game.actions';

export const initialState: PreGameState = {
  games: []
}

export const preGameReducer = createReducer(initialState, 
  on(PreGameAction.receiveGameList, (state, games) => ({
    ...state,
    games: games.games
  })),
  on(PreGameAction.flushState, (state) => ({
    ...state,
    games: []
  }))
);
