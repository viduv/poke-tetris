import { Dot } from './Dot';
import {GridSize} from './Definitions';

describe('O', () => {
  it('should create an instance', () => {
    let  x = {} as GridSize
    expect(new Dot(5, 6, x)).toBeTruthy();
  });
});
