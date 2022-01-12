import {createAction, props} from '@ngrx/store';
import {Self} from "./self";
import {Game} from "./game";

export const populateSelf = createAction(
  '[Populate Self]',
  props<{ self: Self }>()
)

export const populateGame = createAction('[Populate Game]', props<{ game: Game }>());

export const flushState = createAction(
  '[Tetris Flush State]',
)
