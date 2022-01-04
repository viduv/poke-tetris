import { createAction, props } from '@ngrx/store';
import {PreGame} from "./pre-game";

export const receiveGameList = createAction(
  '[Tetris] Receive games list',
  props<{ games: Array<PreGame> }>()
);

export const flushState = createAction(
  '[Tetris Flush State]',
)
