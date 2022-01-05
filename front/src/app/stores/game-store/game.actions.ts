import { createAction, props } from '@ngrx/store';
import {Game} from "./game";

export const flushState = createAction(
  '[Tetris Flush State]',
)
