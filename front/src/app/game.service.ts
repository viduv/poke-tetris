import {Injectable} from '@angular/core';
import {Store} from "@ngrx/store";
import {GameState} from "./stores/game-store/game.state";
import {Socket} from "ngx-socket-io";
import {Game} from "./stores/game-store/game";
import {populateGame} from "./stores/game-store/game.actions";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(protected gameStore: Store<GameState>, private socket: Socket) {
  }

  public initGameSocket(gameId: string): void {
    console.log("init game socket")
    this.socket.fromEvent<Game>("game").subscribe((game: Game) => {
      console.log("event game", game)
      this.gameStore.dispatch(populateGame({game: game}));
    });
    this.socket.emit("game", {id: gameId});
  }
}
