import {ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, Input, OnInit} from '@angular/core';
import {Tile} from "../../../gameplay.service";

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TileComponent {
  @Input()
  log = false;

  @Input() data: Tile;

  @HostBinding("style.--color")
  private color: string | null;

  constructor() {
  }

  public update(): void {
    this.color = this.data.color;
  }
}
