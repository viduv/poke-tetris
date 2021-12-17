import {MemoizedSelector, createSelector, createFeatureSelector} from '@ngrx/store';
import {preGameKey, PreGameState} from "./pre-game.state";

export const selectPreGame: MemoizedSelector<Object, PreGameState> = createFeatureSelector<PreGameState>(preGameKey);

export const selectPreGameGames = createSelector(selectPreGame, (state: PreGameState) => state.games);
