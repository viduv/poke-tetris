import {Component, Input, OnInit} from '@angular/core';
import {Piece} from "../model/pieces/piece";

@Component({
  selector: 'app-piece-presentation',
  templateUrl: './piece-presentation.component.html',
  styleUrls: ['./piece-presentation.component.scss']
})
export class PiecePresentationComponent implements OnInit {

  @Input() piece: Piece;

  constructor() { }

  ngOnInit(): void {
    console.log(this.piece.positionsOnGrid)
  }

  getTileColor(tilePosition: number) {

    return this.piece.positionsOnGrid.find(position => position === tilePosition) !== undefined ? this.piece.color : "transparent";
  }


}
