import { TestBed } from '@angular/core/testing';

import { GameplayService } from './gameplay.service';

describe('GameplayService', () => {
  let service: GameplayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameplayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be initialize', () => {
    let spySpawnNewPiece = spyOn((<any>service), "spawnNewPiece").and.callFake(() => {});
    let spyDrawPiece = spyOn((<any>service), "drawPiece").and.callFake(() => {});

    service.start();
    expect((<any>service).gridSize).toEqual({height: 20, width: 10});
    expect((<any>service).gameSpeed).toEqual(300);
    expect((<any>service).isLose).toBeFalse();
    expect((<any>service).locked).toBeFalse();
    expect((<any>service).grid.length).toEqual(10 * 20);
    service.grid.forEach(tile => {
      expect(tile.solid).toBeFalse();
      expect(tile.color).toEqual("transparent");
    });
    expect((<any>service).isRun).toBeTrue();
    expect(spySpawnNewPiece);
    expect(spyDrawPiece);
    expect((<any>service).spawnNewPiece).toHaveBeenCalled();
    expect((<any>service).drawPiece).toHaveBeenCalled();
  });
});
