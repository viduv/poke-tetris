import {Component, Input, OnInit} from '@angular/core';
import {GameplayService, Tile} from "../../../gameplay.service";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  @Input()
  get grid(): Array<Tile> {
    return this._grid;
  }
  set grid(value: Array<Tile>) {
    this._grid = value;
    console.log(value);
  }

  private _grid: Array<Tile>;

  constructor(public gameplayService: GameplayService) { }

  ngOnInit(): void {

  }

}
