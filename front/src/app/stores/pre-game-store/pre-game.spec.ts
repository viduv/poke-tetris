import { PreGame } from './pre-game';

describe('PreGame', () => {
  it('should create an instance', () => {
    expect(new PreGame("11-11-11", "game 1", "Player 1")).toBeTruthy();
  });
});
