import { TestBed } from '@angular/core/testing';

import { ChatService } from './chat.service';
import {RouterTestingModule} from "@angular/router/testing";
import {StoreModule} from "@ngrx/store";
import {chatReducer} from "./chat-store/chat.reducer";
import {SocketIoModule} from "ngx-socket-io";
import {AppComponent} from "./app.component";

describe('ChatService', () => {
  let service: ChatService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({ chat: chatReducer }, {}),
        SocketIoModule.forRoot({ url: 'http://localhost:4444', options: {} }),
      ],
      declarations: [
        AppComponent
      ],
    });
    service = TestBed.inject(ChatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
