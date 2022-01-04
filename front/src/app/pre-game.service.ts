import { Injectable } from '@angular/core';
import {Socket} from "ngx-socket-io";
import {Store} from "@ngrx/store";
import {PreGameState} from "./stores/pre-game-store/pre-game.state";
import {PreGame} from "./stores/pre-game-store/pre-game";
import {receiveGameList} from "./stores/pre-game-store/pre-game.actions";
import {Observable, of, Subscription} from "rxjs";
import {selectPreGameGames} from "./stores/pre-game-store/pre-game.selector";

@Injectable({
  providedIn: 'root'
})
export class PreGameService {

  observable: Observable<any> = of("")
  sub: Subscription = new Subscription()

  constructor(protected socket: Socket, protected store: Store<PreGameState>) {
  }

  protected initSocket(): void {
    this.observable = new Observable((observer) => 
      this.socket.on('gamesList', (data : any) => observer.next(data))
    );
    this.sub = this.observable.subscribe(games => this.store.dispatch(receiveGameList({games: games})))
  }

  public getGames(): Observable<PreGame[]> {
    this.initSocket();
    this.socket.emit("gamesList")
    return this.store.select(selectPreGameGames);
  }

  public flushGamesListSocket(): void {
    this.sub.unsubscribe()
  }

}
