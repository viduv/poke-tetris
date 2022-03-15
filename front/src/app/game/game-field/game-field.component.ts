import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Player} from "../../model/player";

@Component({
  selector: 'app-game-field',
  templateUrl: './game-field.component.html',
  styleUrls: ['./game-field.component.scss']
})
export class GameFieldComponent {
  @Input() player: Player | null;

  @Input() otherPlayer: boolean = false;
  @Input() canKick: boolean = false;

  @Output() kickPlayer = new EventEmitter<void>();

  field: number[][];

}
