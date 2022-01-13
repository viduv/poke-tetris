import {createFeatureSelector, createSelector, MemoizedSelector} from '@ngrx/store';
import {key, PreGameState} from "./pre-game.state";

export const selectPreGame: MemoizedSelector<Object, PreGameState> = createFeatureSelector<PreGameState>(key);

export const selectPreGameGames = createSelector(selectPreGame, (state: PreGameState) => state.games);

export const selectPreGamePublicGames = createSelector(selectPreGame, (state: PreGameState) =>
  state.games.filter(game => game.isPublic && game.gameState === "CREATE"));
