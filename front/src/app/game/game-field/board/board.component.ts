import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {GameplayService} from "../../../gameplay.service";
import {TileComponent} from "../tile/tile.component";
import {Store} from "@ngrx/store";
import {GameState} from "../../../stores/game-store/game.state";
import {selectGame, selectSelf} from "../../../stores/game-store/game.selector";
import {Game} from "../../../stores/game-store/game";
import {Piece} from "../../../model/pieces/piece";
import {Dot} from "../../../model/pieces/Dot";
import {GameService} from "../../../game.service";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {

  @ViewChildren(TileComponent) tiles: QueryList<TileComponent>;
  currentUserId: string;
  game: Game;

  nextPiece: Piece;

  constructor(public gameplayService: GameplayService, private gameStore: Store<GameState>, public gameService: GameService) {
    this.gameStore.select(selectGame).subscribe(game => this.game = game);
    this.gameStore.select(selectSelf).subscribe(self => this.currentUserId = self.id);
    this.gameService.nextPiece$.subscribe(nextPiece => {
      this.nextPiece = this.gameService.pieceNumberToPiece(nextPiece, 0, -2, {height: 2, width: 4});
    })
  }
}
