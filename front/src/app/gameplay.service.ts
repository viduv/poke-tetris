import {Injectable} from '@angular/core';
import {Piece} from "./model/pieces/piece";
import {Line} from "./model/pieces/line";

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

  public update(): void {
    console.log("update", this.grid)
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
    console.log("clear" + this.currentPiece?.positionsOnGrid);
    this.currentPiece?.positionsOnGrid.forEach((pos) => {
      this.grid[pos] = Object.assign(this.grid[pos], {color: "transparent"});
    })
  }

  private spawnNewPiece(): void {
    this.currentPiece = new Line(4, -4, this.gridSize);
  }

  private drawPiece(): void {
    this.currentPiece.clearState();
    this.currentPiece.positionsOnGrid
      .forEach((pos) => {
        this.grid[pos] = Object.assign(this.grid[pos], {color: "blue"});
      });
  }

  private markSolid(): void {
    this.currentPiece.positionsOnGrid.forEach((pos) => {
      console.log("set solid", pos);
      this.grid[pos] = Object.assign(this.grid[pos], true);
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
        //     console.log("collide", this.grid[pos])
        if (pos > 0 && this.grid[pos] && this.grid[pos].solid) {
          return true;
        }

        return false;
      });
  }
}
