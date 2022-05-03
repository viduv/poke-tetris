import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {Store, StoreModule} from "@ngrx/store";
import {chatReducer} from "./chat-store/chat.reducer";
import {ChatService} from "./chat.service";
import {Observable} from "rxjs";
import {selectChatMessages} from "./chat-store/chat.selector";
import {Socket, SocketIoModule} from "ngx-socket-io";
import {ChatState} from "./chat-store/chat.state";
import {recieveMessage} from "./chat-store/chat.actions";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
class MockChatService extends ChatService {

  constructor(override socket: Socket, override store: Store<ChatState>) {
    super(socket, store);
  }

  // override initSocket() {
  //   this.store.dispatch(recieveMessage({message: "test1"}));
  //   this.store.dispatch(recieveMessage({message: "test2"}));
  // }

  override getMessages(): Observable<string[]> {
    return this.store.select((selectChatMessages));
  }
}

describe('AppComponent', () => {

  beforeAll((done) => {

    done();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({ chat: chatReducer }, {}),
        SocketIoModule.forRoot({ url: 'http://localhost:4444', options: {} }),
      ],
      declarations: [
        AppComponent
      ],
      providers: [{provide: ChatService, useClass: MockChatService}]
    }).compileComponents();
  });

  afterAll(() => {
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'red-tetris'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('red-tetris');
  });

  // it("getMessages should return ['test1', 'test2']", (done) => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;

  //   setTimeout(()=> {
  //   app.getMessages().subscribe(messages => {
  //       expect(messages).toEqual(["test1", "test2"]);
  //       done();
  //   });
  //   }, 1000);
  // });
});
