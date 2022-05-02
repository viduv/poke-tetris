import {Piece, PieceRotation, PieceTypes} from "./piece";
import {GridSize, PieceMaps} from "./Definitions";

const MAPS: PieceMaps = [];
MAPS[PieceRotation.DEG_0] = [
  [undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, PieceTypes.Lr],
  [undefined, PieceTypes.Lr, PieceTypes.Lr, PieceTypes.Lr],
];

MAPS[PieceRotation.DEG_90] = [
  [undefined, undefined, undefined, undefined],
  [PieceTypes.Lr, undefined, undefined, undefined],
  [PieceTypes.Lr, undefined, undefined, undefined],
  [PieceTypes.Lr, PieceTypes.Lr, undefined, undefined],
];

MAPS[PieceRotation.DEG_180] = [
  [undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined],
  [undefined, PieceTypes.Lr, PieceTypes.Lr, PieceTypes.Lr],
  [undefined, PieceTypes.Lr, undefined, undefined],
];

MAPS[PieceRotation.DEG_270] = [
  [undefined, undefined, undefined, undefined],
  [PieceTypes.Lr, PieceTypes.Lr, undefined, undefined],
  [undefined, PieceTypes.Lr, undefined, undefined],
  [undefined, PieceTypes.Lr, undefined, undefined],
];

export class Lr extends Piece {

  constructor(x: number, y: number, gridSize: GridSize) {
    super(x, y, gridSize, MAPS, "orange");
  }
}
