import { Injectable } from '@angular/core';
import {Socket} from "ngx-socket-io";
import {Store} from "@ngrx/store";
import {PreGameState} from "./stores/pre-game-store/pre-game.state";
import {PreGame} from "./stores/pre-game-store/pre-game";
import {receiveGameList} from "./stores/pre-game-store/pre-game.actions";
import {Observable} from "rxjs";
import {selectPreGameGames} from "./stores/pre-game-store/pre-game.selector";

@Injectable({
  providedIn: 'root'
})
export class PreGameService {

  constructor(protected socket: Socket, protected store: Store<PreGameState>) {
  }

  protected initSocket(): void{
    console.log("TRIGET INIT")
    this.socket.fromEvent<[]>("gamesList")
      .subscribe(games => {
        console.log(games)
        this.store.dispatch(receiveGameList({games: games}))
      });
  }

  public getGames(): Observable<PreGame[]> {
    this.initSocket();
    this.socket.emit("gamesList")
    return this.store.select(selectPreGameGames);
  }
}
