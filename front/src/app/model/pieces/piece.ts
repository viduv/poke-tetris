import {GridSize, PieceMap, PieceMaps} from "./Definitions";

export enum PieceRotation {
  DEG_0 = 0,
  DEG_90 = 1,
  DEG_180 = 2,
  DEG_270 = 3
}

export enum PieceTypes {
  Dot = 1,
  Box = 2,
  Line = 3,
  T = 4,
  L = 5,
  Lr = 6,
  Z = 7,
  S = 8
}

export class Piece {
  x: number;
  y: number;
  rotation: PieceRotation = PieceRotation.DEG_0;

  protected maps: PieceMaps;
  protected map: PieceMap = [[], []];
  protected gridSize;

  protected previousState: { x: number, y: number, rotation: PieceRotation, map: PieceMap } | null = null;
  color = "blue";

  constructor(x: number, y: number, gridSize: GridSize, maps: PieceMaps, color: string) {
    this.x = x;
    this.y = y;
    this.gridSize = gridSize;
    this.maps = maps;
    this.map = this.maps[this.rotation];
    this.color = color;
  }

  public storeState() {
    this.previousState = {
      x: this.x,
      y: this.y,
      rotation: this.rotation,
      map: this.map
    };
  }

  public revert() {
    if (this.previousState) {
      this.x = this.previousState.x;
      this.y = this.previousState.y;
      this.rotation = this.previousState.rotation;
      this.map = this.previousState.map;
      this.clearState();
    }
  }

  public clearState() {
    this.previousState = null;
  }

  get leftColumn(): number {
    return this.x;
  }

  get rightColumn(): number {
    let col = 3;
    while (col >= 0) {
      for (let row = 0; row <= 3; row++) {
        if (this.map[row][col]) {
          return this.x + col;
        }
      }
      col--;
    }
    return 0;
  }

  get bottomRow() {
    return this.y + 3;
  }

  get positionsOnGrid(): number[] {
    const acc = [];
    for (let row = 0; row < 4; row++)
      for (let col = 0; col < 4; col++)
        if (this.map[row][col]) {
          const pos = (this.y + row) * this.gridSize.width + this.x + col;
          if (pos >= 0)
            acc.push(pos);
        }
    return acc;
  }

  public moveDown(): void {
    this.y++;
  }

  public moveRight(): void {
    this.x++;
  }

  public moveLeft(): void {
    this.x--;
  }

  public rotate(): void {
    const keys = Object.keys(this.maps);
    let idx = keys.indexOf(this.rotation.toString());
    if (idx >= keys.length - 1) {
      this.rotation = keys[0] as any;
    } else {
      this.rotation = keys[++idx] as any;
    }
    this.map = this.maps[this.rotation];
  }
}
