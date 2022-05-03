import { T } from './t';
import {GridSize} from './Definitions';

describe('T', () => {
  it('should create an instance', () => {
    let x = {} as GridSize
    expect(new T(5, 6 , x)).toBeTruthy();
  });
});
