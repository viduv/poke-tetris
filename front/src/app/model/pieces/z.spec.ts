import { Z } from './z';
import {GridSize} from './Definitions';

describe('Z', () => {
  it('should create an instance', () => {
    let  x = {} as GridSize
    expect(new Z(5, 6, x)).toBeTruthy();
  });
});
