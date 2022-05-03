import { Lr } from './lr';
import {GridSize} from './Definitions';

describe('Lr', () => {
  it('should create an instance', () => {
    let  x = {} as GridSize
    expect(new Lr(5, 6, x)).toBeTruthy();
  });
});
