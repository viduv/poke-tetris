import { Line } from './line';
import {GridSize} from './Definitions';

describe('Line', () => {
  it('should create an instance', () => {
    let  x = {} as GridSize
    expect(new Line(5, 6, x)).toBeTruthy();
  });
});
