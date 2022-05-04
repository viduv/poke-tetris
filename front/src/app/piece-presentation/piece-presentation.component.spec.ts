import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiecePresentationComponent } from './piece-presentation.component';
import {T} from "../model/pieces/t";

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

  it('should return each tile colors', () => {
    component.piece = new T(0, -2, {height: 2, width: 3});
    expect(component.getTileColor(0)).toEqual("transparent");
    expect(component.getTileColor(1)).toEqual("purple");
    expect(component.getTileColor(2)).toEqual("transparent");
    expect(component.getTileColor(3)).toEqual("purple");
    expect(component.getTileColor(4)).toEqual("purple");
    expect(component.getTileColor(5)).toEqual("purple");
  });

  it('should set mode to game', () => {
    component.mode = "game";
    expect(component.mode).toEqual("game");
    expect(component.column).toEqual(4);
  });

  it('should set mode to presentation', () => {
    component.mode = "presentation";
    expect(component.column).toEqual(3);
  })
});
