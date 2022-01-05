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

  gamesList: Observable<Array<PreGame>> = new Observable()
  sub: Subscription = new Subscription()

  constructor(protected socket: Socket, protected store: Store<PreGameState>) {
  }

  protected initGamesListSocket(): void {
    this.gamesList = new Observable((observer) => 
      this.socket.on('gamesList', (data : Array<PreGame>) => observer.next(data))
    );
    this.sub = this.gamesList.subscribe(games => this.store.dispatch(receiveGameList({games: games})))
  }

  public getGames(): Observable<PreGame[]> {
    this.initGamesListSocket();
    this.socket.emit("gamesList")
    return this.store.select(selectPreGameGames);
  }

  public CreateGame(game: object): void {
    this.socket.emit("createGame", game)
  }

  public flushGamesListSocket(): void {
    this.sub.unsubscribe()
  }

}
