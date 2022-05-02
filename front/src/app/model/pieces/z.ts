import {Piece, PieceRotation, PieceTypes} from "./piece";
import {GridSize, PieceMaps} from "./Definitions";

const MAPS: PieceMaps = [];
MAPS[PieceRotation.DEG_0] = [
  [undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined],
  [undefined, PieceTypes.Z, PieceTypes.Z, undefined],
  [PieceTypes.Z, PieceTypes.Z, undefined, undefined],
];

MAPS[PieceRotation.DEG_90] = [
  [undefined, undefined, undefined, undefined],
  [PieceTypes.Z, undefined, undefined, undefined],
  [PieceTypes.Z, PieceTypes.Z, undefined, undefined],
  [undefined, PieceTypes.Z, undefined, undefined],
];

export class Z extends Piece {

  constructor(x: number, y: number, gridSize: GridSize) {
    super(x, y, gridSize, MAPS, "green");
  }
}
