import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {GameplayService} from "../../../gameplay.service";
import {TileComponent} from "../tile/tile.component";
import {Store} from "@ngrx/store";
import {GameState} from "../../../stores/game-store/game.state";
import {selectGame, selectSelf} from "../../../stores/game-store/game.selector";
import {Game} from "../../../stores/game-store/game";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  @ViewChildren(TileComponent) tiles: QueryList<TileComponent>;
  currentUserId: string;
  game: Game;

  constructor(public gameplayService: GameplayService, private gameStore: Store<GameState>) {
    this.gameStore.select(selectGame).subscribe(game => this.game = game);
    this.gameStore.select(selectSelf).subscribe(self => this.currentUserId = self.id);
  }

  public ngOnInit() {
    this.gameplayService.gridSubject.subscribe(() => {
      console.log("update", this.tiles)
      this.tiles?.forEach(tile => tile.update())
    });

  }

  getLockLine() {
    return this.game.players.find(p => p.id === this.currentUserId)?.lockline ?? 0;
  }
}
