import { createAction, props } from '@ngrx/store';
import {Self} from "../../model/self";

export const populateSelf = createAction(
  '[Populate Self]',
  props<{ self: Self }>()
)

export const flushState = createAction(
  '[Tetris Flush State]',
)
