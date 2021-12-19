import {MemoizedSelector, createSelector, createFeatureSelector} from '@ngrx/store';
import {key, PreGameState} from "./pre-game.state";

export const selectPreGame: MemoizedSelector<Object, PreGameState> = createFeatureSelector<PreGameState>(key);

export const selectPreGameGames = createSelector(selectPreGame, (state: PreGameState) => state.games);
