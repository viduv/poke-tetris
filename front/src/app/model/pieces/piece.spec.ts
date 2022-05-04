import { Piece } from './piece';
import {GridSize, PieceMaps} from './Definitions';

describe('Piece', () => {
  it('should create an instance', () => {
    let  x = {} as GridSize
    let s = {} as PieceMaps
    expect(new Piece(5, 6 , x, s, "purple")).toBeTruthy();
  });
});
