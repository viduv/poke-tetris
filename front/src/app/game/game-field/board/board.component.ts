import {ChangeDetectorRef, Component, Input, OnInit, QueryList, ViewChildren} from '@angular/core';
import {GameplayService, Tile} from "../../../gameplay.service";
import {TileComponent} from "../tile/tile.component";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  @ViewChildren(TileComponent) tiles: QueryList<TileComponent>;

  constructor(public gameplayService: GameplayService) {}

  public ngOnInit() {
    this.gameplayService.gridSubject.subscribe(() => this.tiles?.forEach(tile => tile.update()))
  }

}
