import { createAction, props } from '@ngrx/store';

/*export const sendMessage = createAction(
  '[Chat] Send message',
  props<{ message: string }>()
);*/

export const recieveMessage = createAction(
  '[Chat] Recieve chat message',
  props<{ message: string }>()
);
