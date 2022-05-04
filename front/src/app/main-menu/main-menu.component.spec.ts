import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainMenuComponent } from './main-menu.component';

describe('MainMenuComponent', () => {
  let component: MainMenuComponent;
  let fixture: ComponentFixture<MainMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("shoud call open Dialog Form Creation", () => {
    // spy setup 
    let spyDialog = spyOn((<any>component).dialog, "open").and.callThrough();
    component.openDialogCreate()
    expect(spyDialog);
    expect((<any>component).dialog.open).toHaveBeenCalled();
  })

  it("shoud call open Dialog Form Join", () => {
    // spy setup 
    let spyDialog = spyOn((<any>component).dialog, "open").and.callFake(() => {});
    component.openDialogJoin()
    expect(spyDialog);
    expect((<any>component).dialog.open).toHaveBeenCalled();
  })

});
