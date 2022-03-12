import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Player} from "../../model/player";
import {GameplayService} from "../../gameplay.service";

@Component({
  selector: 'app-game-field',
  templateUrl: './game-field.component.html',
  styleUrls: ['./game-field.component.scss']
})
export class GameFieldComponent implements OnInit {
  @Input() player: Player | null;

  @Input() otherPlayer: boolean = false;
  @Input() canKick: boolean = false;

  @Output() kickPlayer = new EventEmitter<void>();

  field: number[][];

  constructor(public gameplayService: GameplayService) { }

  ngOnInit(): void {
  }

}
