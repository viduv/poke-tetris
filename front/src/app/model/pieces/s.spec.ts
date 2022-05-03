import { S } from './s';
import {GridSize} from './Definitions';

describe('S', () => {
  it('should create an instance', () => {
    let  x = {} as GridSize
    expect(new S(5, 6 , x)).toBeTruthy();
  });
});
