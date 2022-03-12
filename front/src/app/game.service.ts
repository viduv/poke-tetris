import {Injectable} from '@angular/core';
import {Store} from "@ngrx/store";
import {GameState} from "./stores/game-store/game.state";
import {Socket} from "ngx-socket-io";
import {Game} from "./stores/game-store/game";
import {populateGame} from "./stores/game-store/game.actions";
import {Player} from "./model/player";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(protected gameStore: Store<GameState>, private socket: Socket) {
  }

  public initGameSocket(gameId: string): void {
    this.socket.fromEvent<Game>("game").subscribe((game: Game) =>
      this.gameStore.dispatch(populateGame({game: game})));
    this.socket.emit("game", {id: gameId});
  }

  public leaveGame(game: Game, playerId: string): void {
    this.socket.emit("leaveGame", ({gameId: game.id, playerId: playerId}));
  }

  public kickPlayer(game:Game, kickPlayer: Player): void {
    this.socket.emit("kickPlayer", ({gameId: game.id, kickPlayerId: kickPlayer.id}));
  }

  startGame(game: Game) {
    this.socket.emit("startGame", ({gameId: game.id}));
  }
}
