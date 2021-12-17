import { Injectable } from '@angular/core';
import {Socket} from "ngx-socket-io";
import {Store} from "@ngrx/store";
import {ChatState} from "./chat-store/chat.state";
import {Observable, take} from "rxjs";
import {selectChatMessages} from "./chat-store/chat.selector";
import {recieveMessage} from "./chat-store/chat.actions";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(protected socket: Socket, protected store: Store<ChatState>) {
    this.initSocket();
  }

  initSocket() {
    this.socket.fromEvent<string[]>("initChat")
      .pipe(take(1))
      .subscribe(messages =>
          this.store.dispatch(recieveMessage({messages: messages})));

    this.socket.fromEvent<string[]>("chat")
      .subscribe(messages => this.store.dispatch(recieveMessage({messages: messages})));
  }

  getMessages(): Observable<string[]> {
    return this.store.select((selectChatMessages));
  }

  sendMessage(message: string): void {
    this.socket.emit("receiveMessage", message);
  }
}
