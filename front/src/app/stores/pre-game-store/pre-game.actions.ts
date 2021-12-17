import { createAction, props } from '@ngrx/store';
import {PreGame} from "./pre-game";

export const receiveGameList = createAction(
  '[Tetris] Recieve games list',
  props<{ games: PreGame[] }>()
);
