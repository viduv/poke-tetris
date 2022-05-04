import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreateGameComponent } from './dialog-create-game.component';

describe('DialogCreateGameComponent', () => {
  let component: DialogCreateGameComponent;
  let fixture: ComponentFixture<DialogCreateGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCreateGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCreateGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should be true when formcontrol is empty ", () => {
    expect(component.isDisabled()).toBeTrue()
  })
  
  it("should be false when formcontrol is correct", () => {
    component.createGameForm.controls["gameName"].setValue("Tetris")
    component.createGameForm.controls["playerName"].setValue("Nicolas")
    component.createGameForm.controls["gameIsPublic"].setValue("True")
    expect(component.isDisabled()).toBeFalse()
  })

  it("shoud call createGame Method", () => {
    // spy setup 
    var spyPreGame = spyOn((<any>component).preGameService, "CreateGame").and.callThrough();
    var spyDialogRef = spyOn((<any>component).dialogRef, "close").and.callThrough();
    // init variable
    component.createGameForm.controls["gameName"].setValue("Tetris")
    component.createGameForm.controls["playerName"].setValue("Nicolas")
    component.createGameForm.controls["gameIsPublic"].setValue("True")
    component.createGame()
    expect(spyPreGame);
    expect(spyDialogRef)
    expect((<any>component).preGameService.CreateGame).toHaveBeenCalled();
    expect((<any>component).dialogRef.close).toHaveBeenCalled()
  })

  it("should call closeDialog", () => {
    var spyDialogRef = spyOn((<any>component).dialogRef, "close").and.callThrough();
    component.closeDialog()
    expect(spyDialogRef)
    expect((<any>component).dialogRef.close).toHaveBeenCalled()
  })
});
