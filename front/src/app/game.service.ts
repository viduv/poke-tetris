import {Injectable} from '@angular/core';
import {Store} from "@ngrx/store";
import {GameState} from "./stores/game-store/game.state";
import {Socket} from "ngx-socket-io";
import {Game} from "./stores/game-store/game";
import {populateGame} from "./stores/game-store/game.actions";
import {Player} from "./model/player";
import {ReplaySubject} from "rxjs";
import {GridSize} from "./model/pieces/Definitions";
import {Piece} from "./model/pieces/piece";
import {Line} from "./model/pieces/line";
import {Dot} from "./model/pieces/Dot";
import {T} from "./model/pieces/t";
import {L} from "./model/pieces/l";
import {Lr} from "./model/pieces/lr";
import {Z} from "./model/pieces/z";
import {S} from "./model/pieces/s";
import {MatDialog} from "@angular/material/dialog";
import {WinDialogComponent} from "./game/win-dialog/win-dialog.component";
import {Router} from "@angular/router";
import {RedirectionDialogComponent} from "./game/redirection-dialog/redirection-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  nextPieceNumber: number;
  public nextPiece$ = new ReplaySubject<number>(1);

  constructor(protected gameStore: Store<GameState>, private socket: Socket, public dialog: MatDialog, private router: Router) {
  }

  public initGameSocket(gameId: string): void {
    this.socket.fromEvent<Game>("game").subscribe((game: Game) =>
      this.gameStore.dispatch(populateGame({game: game})));
    this.socket.emit("game", {id: gameId});
    this.socket.fromEvent<number>("nextPiece").subscribe((nextPieceNumber: number) => {
      this.nextPieceNumber = nextPieceNumber;
      this.nextPiece$.next(this.nextPieceNumber);
    });
    this.socket.fromEvent<any>("winner").subscribe(() => {
      console.log("win")
      this.dialog.open(WinDialogComponent, {width: '60%'});
    });
    this.socket.fromEvent<any>("redirect").subscribe(() => {
      this.router.navigate(['']);
      this.dialog.open(RedirectionDialogComponent, {width: '60%'});
    })
  }

  public leaveGame(game: Game, playerId: string): void {
    this.socket.emit("leaveGame", ({gameId: game.id, playerId: playerId}));
  }

  public kickPlayer(game: Game, kickPlayer: Player): void {
    this.socket.emit("kickPlayer", ({gameId: game.id, kickPlayerId: kickPlayer.id}));
  }

  startGame(game: Game) {
    this.socket.emit("startGame", ({gameId: game.id}));
  }

  clearLine(game: Game, count: number) {
    this.socket.emit("lockLine", {gameId: game.id, lockline: count});
  }

  updateSpectrum(game: Game, spectrum: Array<number>) {
    this.socket.emit("spectrum", {gameId: game.id, spectrum});
  }

  loadNextPiece(gameId: string): number {
    this.socket.emit("nextPiece", {gameId: gameId});
    return this.nextPieceNumber;
  }

  lose(gameId: string) {
    this.socket.emit("lose", {gameId: gameId})
  }

  pieceNumberToPiece(pieceNumber: number, x: number, y: number, gridSize: GridSize): Piece {
    switch (pieceNumber) {
      case 0:
        return new Line(x, y, gridSize);
      case 1:
        return new Dot(x, y, gridSize);
      case 2:
        return new T(x, y, gridSize);
      case 3:
        return new L(x, y, gridSize);
      case 4:
        return new Lr(x, y, gridSize);
      case 5:
        return new Z(x, y, gridSize);
      case 6:
        return new S(x, y, gridSize);
      default:
        return undefined as any;
    }
  }
}
