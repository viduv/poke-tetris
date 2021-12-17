import { createReducer, on } from '@ngrx/store';
import * as ChatAction from './chat.actions';
import {ChatState} from "./chat.state";

export const initialState: ChatState = {
  messages: []
}

export const chatReducer = createReducer(initialState, on(ChatAction.recieveMessage, (state, messages) => ({
  ...state,
    messages: messages.messages
  })
));
