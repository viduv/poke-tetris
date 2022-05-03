import {Component, HostBinding, Input} from '@angular/core';
import {Piece} from "../model/pieces/piece";

@Component({
  selector: 'app-piece-presentation',
  templateUrl: './piece-presentation.component.html',
  styleUrls: ['./piece-presentation.component.scss']
})
export class PiecePresentationComponent {
  @Input()
  get mode(): "game" | "presentation" {
    return this._mode;
  }

  set mode(value: "game" | "presentation") {
    this._mode = value;
    if (value === "game")
      this.column = 4;
    else
      this.column = 3;
  }

  @Input() piece: Piece;
  private _mode: 'game' | 'presentation' = 'game';

  @HostBinding('style.--column')
  column: number = 4;

  getTileColor(tilePosition: number) {
    return this.piece?.positionsOnGrid.find(position => position === tilePosition) !== undefined ? this.piece.color : "transparent";
  }

}
