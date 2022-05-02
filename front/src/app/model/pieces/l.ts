import {Piece, PieceRotation, PieceTypes} from "./piece";
import {GridSize, PieceMaps} from "./Definitions";

const MAPS: PieceMaps = [];
MAPS[PieceRotation.DEG_0] = [
  [undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined],
  [PieceTypes.L, undefined, undefined, undefined],
  [PieceTypes.L, PieceTypes.L, PieceTypes.L, undefined],
];

MAPS[PieceRotation.DEG_90] = [
  [undefined, undefined, undefined, undefined],
  [PieceTypes.L, PieceTypes.L, undefined, undefined],
  [PieceTypes.L, undefined, undefined, undefined],
  [PieceTypes.L, undefined, undefined, undefined],
];

MAPS[PieceRotation.DEG_180] = [
  [undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined],
  [PieceTypes.L, PieceTypes.L, PieceTypes.L, undefined],
  [undefined, undefined, PieceTypes.L, undefined],
];

MAPS[PieceRotation.DEG_270] = [
  [undefined, undefined, undefined, undefined],
  [undefined, PieceTypes.L, undefined, undefined],
  [undefined, PieceTypes.L, undefined, undefined],
  [PieceTypes.L, PieceTypes.L, undefined, undefined],
];

export class L extends Piece {

  constructor(x: number, y: number, gridSize: GridSize) {
    super(x, y, gridSize, MAPS, "blue");
  }
}
