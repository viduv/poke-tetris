import {T} from './t';
import {GridSize} from './Definitions';
import {PieceRotation, PieceTypes} from "./piece";

describe('T', () => {
  it('should create an instance', () => {
    let x = {} as GridSize
    expect(new T(5, 6 , x)).toBeTruthy();
  });

  it('should change x when call move right and left', () => {
    let piece = new T(4, 0, {height: 20, width: 10});
    piece.moveLeft();
    expect(piece.x).toBe(3);
    piece.moveRight();
    expect(piece.x).toBe(4);
  });

  it('should change y when call move down', () => {
    let piece = new T(4, 0, {height: 20, width: 10});
    piece.moveDown();
    expect(piece.y).toBe(1);
  });

  it('should change grid coord when rotate', () => {
    let piece = new T(4, 0, {height: 20, width: 10});
    expect(piece.positionsOnGrid).toEqual([25, 34, 35, 36]);
    piece.rotate();
    expect(piece.positionsOnGrid).toEqual([14, 24, 25, 34]);
  });

  it('should return x value', () => {
    let piece = new T(4, 0, {height: 20, width: 10});
    expect(piece.leftColumn).toEqual(4);
    piece.moveRight();
    expect(piece.leftColumn).toEqual(5);
  });

  it('should return right position', () => {
    let piece = new T(4, 0, {height: 20, width: 10});
    expect(piece.rightColumn).toEqual(6);
    piece.moveRight();
    expect(piece.rightColumn).toEqual(7);
  });

  it('should return bottom position', () => {
    let piece = new T(4, 0, {height: 20, width: 10});
    expect(piece.bottomRow).toEqual(3);
    piece.moveDown();
    expect(piece.bottomRow).toEqual(4);
  });

  it('should return previous position', () => {
    let piece = new T(4, 0, {height: 20, width: 10});
    let baseMap = [
      [undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined],
      [undefined, PieceTypes.T, undefined, undefined],
      [PieceTypes.T, PieceTypes.T, PieceTypes.T, undefined],
    ];
    piece.storeState();
    piece.moveDown();
    expect((<any>piece).previousState).toEqual({x: 4, y:0, rotation: PieceRotation.DEG_0, map: baseMap});
    piece.revert();
    expect(piece.x).toEqual(4);
    expect(piece.y).toEqual(0);
    expect(piece.rotation).toEqual(PieceRotation.DEG_0);
    piece.clearState();
    expect((<any>piece).previousState).toBeNull();
  });
});
