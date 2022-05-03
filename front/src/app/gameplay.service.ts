import {Injectable} from '@angular/core';
import {Piece} from "./model/pieces/piece";
import {Line} from "./model/pieces/line";
import {ReplaySubject} from "rxjs";
import {GameService} from "./game.service";
import {Game} from "./stores/game-store/game";
import {GameState} from "./stores/game-store/game.state";
import {Store} from "@ngrx/store";
import {selectGame, selectSelf} from "./stores/game-store/game.selector";
import {Dot} from "./model/pieces/Dot";
import {T} from "./model/pieces/t";
import {L} from "./model/pieces/l";
import {Lr} from "./model/pieces/lr";
import {Z} from "./model/pieces/z";
import {S} from "./model/pieces/s";

export class Tile {
  solid = false;
  color = "transparent";
}

@Injectable({
  providedIn: 'root'
})
export class GameplayService {

  private game: Game;
  private currentUserId: string;

  private gridSize: {
    width: number,
    height: number
  } = {width: 0, height: 0};
  private gameSpeed: number;
  private currentPiece: Piece;
  public grid: Array<Tile>;
  private locked = false;
  private interval: number | undefined;
  isRun = false;
  isLose = false;
  gridSubject = new ReplaySubject<Tile[]>(1);

  constructor(private gameService: GameService, private gameStore: Store<GameState>) {
    this.gameStore.select(selectGame).subscribe(game => this.game = game);
    this.gameStore.select(selectSelf).subscribe(self => this.currentUserId = self.id);
  }

  initialize(width: number, height: number, gameSpeed: number): void {
    this.gridSize.width = width;
    this.gridSize.height = height;
    this.gameSpeed = gameSpeed;
    this.isLose = false;
    this.locked = false;

    const cellsCount = this.gridSize.width * this.gridSize.height;
    this.grid = Array.apply(null, Array(cellsCount))
      .map(() => new Tile());
  }

  start(): void {
    if (!this.isRun) {
      console.log("start")
      this.initialize(10, 20, 300);
      this.spawnNewPiece();
      this.drawPiece();
      this.interval = setInterval(() => this.update(), this.gameSpeed);
      this.isRun = true;
    }
  }

  stop(): void {
    if (this.isRun) {
      clearInterval(this.interval);
      this.isRun = false;
    }
  }

  public moveLeft() {
    if (this.locked || this.isLose) {
      return;
    }
    this.clearPiece();
    this.currentPiece.storeState();

    this.currentPiece.moveLeft();
    if (this.collidesLeft()) {
      this.currentPiece.revert();
    }
    this.drawPiece();
  }

  public moveRight() {
    if (this.locked || this.isLose) {
      return;
    }
    this.clearPiece();
    this.currentPiece.storeState();

    this.currentPiece.moveRight();
    if (this.collidesRight()) {
      this.currentPiece.revert();
    }
    this.drawPiece();
  }

  public rotate() {
    if (this.locked || this.isLose) {
      return;
    }

    this.clearPiece();
    this.currentPiece.storeState();

    this.currentPiece.rotate();
    while (this.collidesRight()) {
      this.currentPiece.moveLeft();
      if (this.collidesLeft()) {
        this.currentPiece.revert();
        break;
      }
    }
    this.drawPiece();
  }

  public update(): void {
    if (this.locked || this.isLose) {
      return;
    }
    this.locked = true;

    this.clearPiece();
    this.currentPiece.storeState();
    this.currentPiece.moveDown();
    if (this.collidesBottom()) {
      this.currentPiece.revert();
      this.markSolid();
      this.drawPiece();

      this.clearFullLines();

      this.spawnNewPiece();
      if (this.isGameOver()) {
        this.isLose = true;
        this.gameService.lose(this.game.id);
        return;
      }
    }

    this.drawPiece();
    this.locked = false;
  }

  private updateSubject() {
    let countLock = this.game.players.find(p => p.id === this.currentUserId)?.lockline ?? 0;
    const topPortion = this.grid.slice(countLock * this.gridSize.width, this.gridSize.height * this.gridSize.width);
    let g = new Array<Tile>();
    g.push(...topPortion);
    for (let i = 0; i < countLock * this.gridSize.width; i++) {
      g.push({solid: true, color: "grey"})
    }
    this.gridSubject.next(g);
  }

  freeze() {
    clearInterval(this.interval);
  }

  private isGameOver() {
    this.currentPiece.storeState();
    this.currentPiece.moveDown();
    if (this.collidesBottom()) {
      return true;
    }

    this.currentPiece.revert();
    return false;
  }

  private clearFullLines() {
    let countClear = 0;
    for (let row = this.gridSize.height - 1; row >= 0; row--) {
      let isFull = true;
      for (let col = 0; col < this.gridSize.width; col++) {
        const pos = row * this.gridSize.width + col;
        if (!this.grid[pos].solid) {
          isFull = false;
          break;
        }
      }

      if (isFull) {
        const emptyRow = Array.apply(null, Array(this.gridSize.width))
          .map(() => new Tile());

        const topPortion = this.grid.slice(0, row * this.gridSize.width);

        this.grid.splice(0, ++row * this.gridSize.width, ...emptyRow.concat(topPortion));
        this.updateSubject();
        countClear++;
      }
    }
    if (countClear > 1)
      this.gameService.clearLine(this.game, countClear - 1);
  }

  clearPiece(): void {
    this.currentPiece?.positionsOnGrid.forEach((pos) => {
      this.grid[pos] = {color: "transparent", solid: this.grid[pos].solid};
    });
  }

  private spawnNewPiece(): void {
    switch (this.gameService.loadNextPiece(this.game.id)) {
      case 0:
        this.currentPiece = new Line(4, -4 + (this.game.players.find(p => p.id === this.currentUserId)?.lockline ?? 0), this.gridSize)
        break;
      case 1:
        this.currentPiece = new Dot(4, -4 + (this.game.players.find(p => p.id === this.currentUserId)?.lockline ?? 0), this.gridSize)
        break;
      case 2:
        this.currentPiece = new T(4, -4 + (this.game.players.find(p => p.id === this.currentUserId)?.lockline ?? 0), this.gridSize)
        break;
      case 3:
        this.currentPiece = new L(4, -4 + (this.game.players.find(p => p.id === this.currentUserId)?.lockline ?? 0), this.gridSize)
        break;
      case 4:
        this.currentPiece = new Lr(4, -4 + (this.game.players.find(p => p.id === this.currentUserId)?.lockline ?? 0), this.gridSize)
        break;
      case 5:
        this.currentPiece = new Z(4, -4 + (this.game.players.find(p => p.id === this.currentUserId)?.lockline ?? 0), this.gridSize)
        break;
      case 6:
        this.currentPiece = new S(4, -4 + (this.game.players.find(p => p.id === this.currentUserId)?.lockline ?? 0), this.gridSize)
        break;
    }
  }

  private drawPiece(): void {
    this.currentPiece.clearState();
    this.currentPiece.positionsOnGrid
      .forEach((pos) => {
        this.grid[pos] = {color: this.currentPiece.color, solid: this.grid[pos].solid};
      });
    this.updateSubject();
  }

  private markSolid(): void {
    this.currentPiece.positionsOnGrid.forEach((pos) => {
      this.grid[pos] = {color: this.grid[pos].color, solid: true};
      //    this.gameService.updateSpectrum(this.game, this.generateSpectrum())
    });
  }

  private collidesBottom(): boolean {
    if (this.currentPiece.bottomRow >= this.gridSize.height) {
      return true;
    }
    return this.collides();
  }

  private collidesLeft(): boolean {
    if (this.currentPiece.leftColumn < 0) {
      return true;
    }

    return this.collides();
  }

  private collidesRight(): boolean {
    if (this.currentPiece.rightColumn >= this.gridSize.width) {
      return true;
    }

    return this.collides();
  }

  private collides(): boolean {
    return this.currentPiece.positionsOnGrid
      .some((pos) => {
        return pos > 0 && this.grid[pos] && this.grid[pos].solid;
      });
  }
}
