import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiecePresentationComponent } from './piece-presentation.component';

describe('PiecePresentationComponent', () => {
  let component: PiecePresentationComponent;
  let fixture: ComponentFixture<PiecePresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PiecePresentationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PiecePresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
