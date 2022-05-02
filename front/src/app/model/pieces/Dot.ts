import {Piece, PieceRotation, PieceTypes} from "./piece";
import {GridSize, PieceMaps} from "./Definitions";

const MAPS: PieceMaps = [];
MAPS[PieceRotation.DEG_0] = [
  [undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined],
  [PieceTypes.Dot, PieceTypes.Dot, undefined, undefined],
  [PieceTypes.Dot, PieceTypes.Dot, undefined, undefined],
];

export class Dot extends Piece {
  constructor(x: number, y: number, gridSize: GridSize) {
    super(x, y, gridSize, MAPS, "yellow");
  }
}
