import { createAction, props } from '@ngrx/store';

export const recieveMessage = createAction(
  '[Chat] Recieve chat message',
  props<{ messages: string[] }>()
);
