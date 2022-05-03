import {Injectable} from '@angular/core';
import {Socket} from "ngx-socket-io";
import {Store} from "@ngrx/store";
import {PreGameState} from "./stores/pre-game-store/pre-game.state";
import {PreGame} from "./stores/pre-game-store/pre-game";
import {flushState, receiveGameList} from "./stores/pre-game-store/pre-game.actions";
import {Observable, Subscription} from "rxjs";
import {selectPreGameGames} from "./stores/pre-game-store/pre-game.selector";
import {GameState} from "./stores/game-store/game.state"
import {Self} from "./stores/game-store/self"
import {populateSelf} from "./stores/game-store/game.actions"
import {Router} from '@angular/router';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class PreGameService {

  gamesList: Observable<Array<PreGame>> = new Observable()
  self: Observable<Self> = new Observable()
  gamesListSub: Subscription = new Subscription()
  selfSub: Subscription = new Subscription()

  constructor(protected socket: Socket,
              protected preGameStore: Store<PreGameState>,
              protected gameStore: Store<GameState>,
              private router: Router,
              private snackBar: MatSnackBar,) {
  }

  // Game LIST
  protected initGamesListSocket(): void {
    this.gamesList = new Observable((observer) =>
      this.socket.on('gamesList', (data: Array<PreGame>) => observer.next(data))
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
      this.socket.on("self", (data: Self) => observer.next(data))
    );
    this.socket.on("gameId", (data: { id: string }) => {
      this.router.navigate(["game/" + data.id]);
    });
    this.selfSub = this.self.subscribe(self => {
        // populate self
        this.gameStore.dispatch(populateSelf({self: self}));
        // flush Pre Game State
        this.preGameStore.dispatch(flushState());
        // Unsubscribe
        this.flushCreateGameSocket();
        // Go to Game
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
  protected initJoinGameSocket(from: string): void {
    this.socket.on("gameId", (data: { id: string, error: boolean }) => {
      if(!data.error){
        if(from === "dialog")
          this.router.navigate(["game/" + data.id]);
      }
      else {
        this.snackBar.open(data.id, "Fermer", {
        duration: 6000,
        verticalPosition: "top",
        horizontalPosition: "center"
        }
      );
      this.router.navigate([""])
      this.selfSub.unsubscribe()
      return ;
      }
    });
    this.self = new Observable((observer) =>
      this.socket.on("self", (data: Self) => observer.next(data))
    );
    this.selfSub = this.self.subscribe(self => {
      // populate self
      this.gameStore.dispatch(populateSelf({self: self}));
      // flush Pre game State
      this.preGameStore.dispatch(flushState());
      // Unsubscribe
      this.flushJoinGameSocket();
    });
  }

  public JoinGame(game: object, from: string): void {
    this.initJoinGameSocket(from);
    this.socket.emit("joinGame", game);
  }

  public flushJoinGameSocket(): void {
    this.selfSub.unsubscribe();
  }

}
