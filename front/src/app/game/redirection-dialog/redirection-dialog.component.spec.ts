import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirectionDialogComponent } from './redirection-dialog.component';

describe('RedirectionDialogComponent', () => {
  let component: RedirectionDialogComponent;
  let fixture: ComponentFixture<RedirectionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedirectionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RedirectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
