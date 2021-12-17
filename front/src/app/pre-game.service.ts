import { Injectable } from '@angular/core';
import {Socket} from "ngx-socket-io";
import {Store} from "@ngrx/store";
import {ChatState} from "./chat-store/chat.state";
import {PreGame} from "./stores/pre-game-store/pre-game";
import {receiveGameList} from "./stores/pre-game-store/pre-game.actions";
import {Observable} from "rxjs";
import {selectPreGameGames} from "./stores/pre-game-store/pre-game.selector";

@Injectable({
  providedIn: 'root'
})
export class PreGameService {

  constructor(protected socket: Socket, protected store: Store<ChatState>) {
    this.initSocket();
  }

  protected initSocket(): void{
    this.socket.fromEvent<[]>("gamesList")
      .subscribe(games => this.store.dispatch(receiveGameList({games: games})));
  }

  public getGames(): Observable<[]> {
    return this.store.select(selectPreGameGames);
  }
}
