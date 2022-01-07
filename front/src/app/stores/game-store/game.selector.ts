import {MemoizedSelector, createSelector, createFeatureSelector} from '@ngrx/store';
import {key, GameState} from "./game.state";

export const selectGameMainSelector: MemoizedSelector<Object, GameState> = createFeatureSelector<GameState>(key);

export const selectGame = createSelector(selectGameMainSelector, (state: GameState) => state.game);

export const selectSelf = createSelector(selectGameMainSelector, (state : GameState) => state.self)