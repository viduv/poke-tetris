import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogJoinGameComponent } from './dialog-join-game.component';

describe('DialogJoinGameComponent', () => {
  let component: DialogJoinGameComponent;
  let fixture: ComponentFixture<DialogJoinGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogJoinGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogJoinGameComponent);
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
    component.gamesForm.controls["gameId"].setValue("4578565242kdsksd4")
    component.gamesForm.controls["playerName"].setValue("Nicolas")
    expect(component.isDisabled()).toBeFalse()
  })

  it("shoud go on first If statement in joinGame Method", () => {
    // spy setup 
    let spyPreGame = spyOn((<any>component).preGameService, "JoinGame").and.callThrough();
    let spyDialogRef = spyOn((<any>component).dialogRef, "close").and.callThrough();
    // init variable
    component.gamesForm.controls["playerName"].setValue("Nicolas")
    component.gamesForm.controls["gameSelect"].setValue("aSuperUuid1254forTesting")
    component.joinGame()
    expect(spyPreGame);
    expect(spyDialogRef)
    expect((<any>component).preGameService.JoinGame).toHaveBeenCalled();
    expect((<any>component).dialogRef.close).toHaveBeenCalled()
  })

  it("shoud go on else else statement on joinGame Method and open snackbar error", () => {
    // spy setup 
    let spySnackbar = spyOn((<any>component).snackBar, "open").and.callThrough();
    // init variable
    component.gamesForm.controls["playerName"].setValue("Nicolas")
    component.gamesForm.controls["gameId"].setValue("aSuperUuid1254forTesting")
    component.joinGame()
    expect(spySnackbar);
    expect((<any>component).snackBar.open).toHaveBeenCalled();
  })


  it("should call closeDialog", () => {
    let spyStore = spyOn((<any>component).store, "dispatch").and.callThrough();
    let spyPreGame = spyOn((<any>component).preGameService, "flushGamesListSocket").and.callThrough();
    let spyDialogRef = spyOn((<any>component).dialogRef, "close").and.callThrough();
 
    component.closeDialog()
    expect(spyDialogRef)
    expect(spyPreGame)
    expect(spyStore)
    expect((<any>component).store.dispatch).toHaveBeenCalled();
    expect((<any>component).preGameService.flushGamesListSocket).toHaveBeenCalled();
    expect((<any>component).dialogRef.close).toHaveBeenCalled()
  })
});
