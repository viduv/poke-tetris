import {Piece, PieceRotation, PieceTypes} from "./piece";
import {GridSize, PieceMaps} from "./Definitions";

const MAPS: PieceMaps = [];
MAPS[PieceRotation.DEG_0] = [
  [undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined],
  [PieceTypes.S, PieceTypes.S, undefined, undefined],
  [undefined, PieceTypes.S, PieceTypes.S, undefined],
];

MAPS[PieceRotation.DEG_90] = [
  [undefined, undefined, undefined, undefined],
  [undefined, PieceTypes.S, undefined, undefined],
  [PieceTypes.S, PieceTypes.S, undefined, undefined],
  [PieceTypes.S, undefined, undefined, undefined],
];

export class S extends Piece {

  constructor(x: number, y: number, gridSize: GridSize) {
    super(x, y, gridSize, MAPS, "red");
  }
}
