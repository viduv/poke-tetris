import {MemoizedSelector, createSelector, createFeatureSelector} from '@ngrx/store';
import {key, ChatState} from "./chat.state";

export const selectChat: MemoizedSelector<Object, ChatState> = createFeatureSelector<ChatState>(key);

export const selectChatMessages = createSelector(selectChat, (state: ChatState) => state.messages);
