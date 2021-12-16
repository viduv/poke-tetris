import {Component, OnDestroy} from '@angular/core';
import { Socket } from "ngx-socket-io";
import { Store } from "@ngrx/store";
import { ChatState } from "./chat-store/chat.state";

import { recieveMessage } from "./chat-store/chat.actions";
import { selectChatMessages } from "./chat-store/chat.selector";
import {Observable, Subscription, take} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'red-tetris';

  chatSubscription: Subscription;

  constructor(private socket: Socket, private store: Store<ChatState>) {
    socket.fromEvent<string[]>("initChat")
      .pipe(take(1))
      .subscribe(messages =>
        messages.forEach(message =>
          store.dispatch(recieveMessage({message: message}))));

    this.chatSubscription = socket.fromEvent<string>("chat")
      .subscribe(message => store.dispatch(recieveMessage({message: message})));
  }

  getMessage(): Observable<string[]> {
    return this.store.select((selectChatMessages));
  }

  write(message: string): void {
    this.socket.emit("sendMessage", message);
  };

  ngOnDestroy(): void {
    this.chatSubscription.unsubscribe();
  }
}
