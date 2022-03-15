import {Injectable} from '@angular/core';
import {Piece} from "./model/pieces/piece";
import {Line} from "./model/pieces/line";
import {BehaviorSubject} from "rxjs";

export class Tile {
  solid = false;
  color = "transparent";
}

@Injectable({
  providedIn: 'root'
})
export class GameplayService {

  private gridSize: {
    width: number,
    height: number
  } = {width: 0, height: 0};
  private gameSpeed: number;
  private currentPiece: Piece;
  public grid: Array<Tile>;
  private locked = false;

  gridSubject = new BehaviorSubject<Array<Tile>>([]);

  constructor() {
  }

  initialize(width: number, height: number, gameSpeed: number, tileSize?: any): void {
    this.gridSize.width = width;
    this.gridSize.height = height;
    this.gameSpeed = gameSpeed;

    const cellsCount = this.gridSize.width * this.gridSize.height;
    this.grid = Array.apply(null, Array(cellsCount))
      .map((idx) => new Tile());
  }

  start(): void {
    this.initialize(10, 20, 300);
    this.spawnNewPiece();
    this.drawPiece();
    /*   setInterval(() => this.update(), this.gameSpeed);*/
  }

  public moveLeft() {
    if (this.locked) {
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
    if (this.locked) {
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
    if (this.locked) {
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
    if (this.locked) {
      return;
    }
    this.locked = true;
    //   this.currentPiece.revert();

    this.clearPiece();
    this.currentPiece.storeState();

    this.currentPiece.moveDown();
    if (this.collidesBottom()) {
      this.currentPiece.revert();
      this.markSolid();
      this.drawPiece();

      //  this.clearFullLines();

      this.spawnNewPiece();
      /*   if (this._isGameOver()) {
           this._onGameOver();
           return;
         }*/
    }

    this.drawPiece();
    this.locked = false;
  }

  clearPiece(): void {
    this.currentPiece?.positionsOnGrid.forEach((pos) => {
      this.grid[pos].color = "transparent";
    });
  }

  private spawnNewPiece(): void {
    this.currentPiece = new Line(4, -4, this.gridSize);
  }

  private drawPiece(): void {
    this.currentPiece.clearState();
    this.currentPiece.positionsOnGrid
      .forEach((pos) => {
        this.grid[pos].color = this.currentPiece.color;
      });
    this.gridSubject.next(this.grid);
  }

  private markSolid(): void {
    this.currentPiece.positionsOnGrid.forEach((pos) => {
      this.grid[pos].solid = true;
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
    console.log("collide grid state", this.grid)
    return this.currentPiece.positionsOnGrid
      .some((pos) => {
        if (pos > 0 && this.grid[pos] && this.grid[pos].solid) {
          return true;
        }

        return false;
      });
  }
}
