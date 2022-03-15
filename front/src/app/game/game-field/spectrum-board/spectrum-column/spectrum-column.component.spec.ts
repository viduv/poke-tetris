import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpectrumColumnComponent } from './spectrum-column.component';

describe('SpectrumColumnComponent', () => {
  let component: SpectrumColumnComponent;
  let fixture: ComponentFixture<SpectrumColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpectrumColumnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpectrumColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
