import { Injectable } from '@angular/core';
import {Socket} from "ngx-socket-io";
import {Store} from "@ngrx/store";
import {PreGameState} from "./stores/pre-game-store/pre-game.state";
import {PreGame} from "./stores/pre-game-store/pre-game";
import {flushState, receiveGameList} from "./stores/pre-game-store/pre-game.actions";
import {Observable, Subscription} from "rxjs";
import {selectPreGameGames} from "./stores/pre-game-store/pre-game.selector";
import {GameState} from "./stores/game-store/game.state"
import {Self} from "./model/self"
import {populateSelf} from "./stores/game-store/game.actions"
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PreGameService {

  gamesList: Observable<Array<PreGame>> = new Observable()
  self: Observable<Self> = new Observable()
  gamesListSub: Subscription = new Subscription()
  selfSub: Subscription = new Subscription()

  constructor(protected socket: Socket, protected preGameStore: Store<PreGameState>, protected GameStore : Store<GameState>, private router: Router) {
  }

  // Game LIST
  protected initGamesListSocket(): void {
    this.gamesList = new Observable((observer) => 
      this.socket.on('gamesList', (data : Array<PreGame>) => observer.next(data))
    );
    this.gamesListSub = this.gamesList.subscribe(games => this.preGameStore.dispatch(receiveGameList({games: games})))
  }

  public getGames(): Observable<PreGame[]> {
    this.initGamesListSocket();
    this.socket.emit("gamesList")
    return this.preGameStore.select(selectPreGameGames);
  }

  public flushGamesListSocket(): void {
    this.gamesListSub.unsubscribe()
  }

  // Game CREATION 
  protected initCreateGameSocket(): void {
    this.self = new Observable((observer) =>
      this.socket.on("createGame", (data : Self) => observer.next(data))
    );
    this.selfSub = this.self.subscribe(self => {
        // populate self
        this.GameStore.dispatch(populateSelf({self: self}))
        // flush Pre Game State
        this.preGameStore.dispatch(flushState())
        // Unsubscribe
        this.flushCreateGameSocket()
        // Go to Game
        this.router.navigate(["game"])
    }
    )
  }

  public CreateGame(game: object): void {
    this.initCreateGameSocket();
    this.socket.emit("createGame", game)
  }

  public flushCreateGameSocket(): void {
    this.selfSub.unsubscribe()
  }

  // Game Join
  protected initJoinGameSocket(): void {
    this.self = new Observable((observer) =>
      this.socket.on("joinGame", (data : Self) => observer.next(data))
    );
    this.selfSub = this.self.subscribe(self => {
      // populate self
      this.GameStore.dispatch(populateSelf({self : self}))
      // flush Pre game State
      this.preGameStore.dispatch(flushState())
      // Unsubscribe
      this.flushJoinGameSocket()
      // Go to Game
      this.router.navigate(["game"])
    })
  }

  public JoinGame(game : object): void {
    this.initJoinGameSocket();
    this.socket.emit("joinGame", game)
  }

  public flushJoinGameSocket(): void {
    this.selfSub.unsubscribe()
  }

}
