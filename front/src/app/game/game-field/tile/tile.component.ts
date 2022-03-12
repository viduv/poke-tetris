import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {Tile} from "../../../gameplay.service";

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent implements OnInit {
  @Input()
  get data(): Tile {
    return this._data;
  }

  set data(value: Tile) {
    this._data = value;
    this.color = value.color;
    console.log("update tile", this.color)
  }

  private _data: Tile;

  @HostBinding("style.--color")
  private color: string | null;

  constructor() {
  }

  ngOnInit(): void {
  }

}
