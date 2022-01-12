import {Component, Input, OnInit} from '@angular/core';
import {Player} from "../../model/player";

@Component({
  selector: 'app-game-field',
  templateUrl: './game-field.component.html',
  styleUrls: ['./game-field.component.scss']
})
export class GameFieldComponent implements OnInit {
  @Input() player: Player | null;

  field: number[][];

  constructor() { }

  ngOnInit(): void {

  }

}
