import { TestBed } from '@angular/core/testing';

import { PreGameService } from './pre-game.service';

describe('PreGameService', () => {
  let service: PreGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreGameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
