import {Component, OnDestroy} from '@angular/core';
import { Socket } from "ngx-socket-io";
import { Store } from "@ngrx/store";
import { ChatState } from "./chat-store/chat.state";

import { recieveMessage } from "./chat-store/chat.actions";
import { selectChatMessages } from "./chat-store/chat.selector";
import {Observable, Subscription, take} from "rxjs";
import {ChatService} from "./chat.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'red-tetris';


  constructor() {
  }
}
