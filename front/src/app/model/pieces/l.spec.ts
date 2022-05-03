import { L } from './l';
import {GridSize} from './Definitions';

describe('L', () => {
  it('should create an instance', () => {
    let  x = {} as GridSize
    expect(new L(5, 6, x)).toBeTruthy();
  });
});
