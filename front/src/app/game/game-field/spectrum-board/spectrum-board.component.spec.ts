import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpectrumBoardComponent } from './spectrum-board.component';

describe('SpectrumBoardComponent', () => {
  let component: SpectrumBoardComponent;
  let fixture: ComponentFixture<SpectrumBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpectrumBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpectrumBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
