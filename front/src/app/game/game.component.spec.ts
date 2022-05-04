import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameComponent } from './game.component';
import { Game } from '../stores/game-store/game';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should return true as self is owner of the game", () => {
    component.game = {
      id : "anIdFortest",
      name : "Game1",
      isPublic : true,
      difficulty: "200",
      gameState : "PLAY",
      players : [
        {
        id: "anId",
        name: "Antoine",
        isOwner : true,
        lockline : 2,
        spectrum : [0, 0],
        hasLose : false
      }
    ]
    }
    component.self = {
      id: "anId",
      name: "Antoine",
      isOwner: true,
    }
    expect(component.isOwner()).toBeTrue()
  })

  it(" should return false without value on game", () => {
    expect(component.isOwner()).toBeFalse()
  })

  it("should return player that is not self depending on input value", () => {
    component.game = {
      id : "anIdFortest",
      name : "Game1",
      isPublic : true,
      difficulty: "200",
      gameState : "PLAY",
      players : [
        {
        id: "anId",
        name: "Antoine",
        isOwner : true,
        lockline : 2,
        spectrum : [0, 0],
        hasLose : false
      },
      {
        id: "anSecondId",
        name: "Iskander",
        isOwner: false,
        lockline: 0,
        spectrum: [0,0],
        hasLose: false
      }
    ]
    }
    component.self = {
      id: "anId",
      name: "Antoine",
      isOwner: true,
    }
    expect(component.getOtherPlayers(0)).toEqual({
      id: "anSecondId",
      name: "Iskander",
      isOwner: false,
      lockline: 0,
      spectrum: [0,0],
      hasLose: false
    })
  })

  it("Should call leaveGame"), () => {
    let spyRouter = spyOn((<any>component).router, "navigate").and.callFake(() => {});
    let spyleaveGame = spyOn((<any>component).gameService, "leaveGame").and.callThrough();
    component.leaveGame()
    expect(spyRouter)
    expect(spyleaveGame)
    expect((<any>component).router.navigate).toHaveBeenCalled();
    expect((<any>component).gameService.leaveGame).toHaveBeenCalled();
  }

  it("Should call kickPlayer"), () => {
    let spyGameService = spyOn((<any>component).gameService, "kickPlayer").and.callThrough();
    component.kickPlayer({
      id: "anSecondId",
      name: "Iskander",
      isOwner: false,
      lockline: 0,
      spectrum: [0,0],
      hasLose: false
    })
    expect(spyGameService)
    expect((<any>component).gameService.kickPlayer).toHaveBeenCalled();
  }

  it( "Should call startGame"), () => {
    let spyGameService = spyOn((<any>component).gameService, "startGame").and.callThrough();
    component.startGame()
    expect(spyGameService)
    expect((<any>component).gameService.startGame).toHaveBeenCalled();
  }

  it("Keyboard Event "), () => {
    let spyGameService = spyOn((<any>component).gameService, "update").and.callThrough();
    component.handleKeyboardEvent(<KeyboardEvent>{key : "ArrowDown"})
    expect(spyGameService)
    expect((<any>component).gameService.update).toHaveBeenCalled();
  }
});
