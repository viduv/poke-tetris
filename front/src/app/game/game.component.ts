import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GameService} from "../game.service";
import {Self} from "../stores/game-store/self";
import {Game} from "../stores/game-store/game";
import {Player} from "../model/player";
import {Store} from "@ngrx/store";
import {GameState} from "../stores/game-store/game.state";
import {selectGame, selectSelf} from "../stores/game-store/game.selector";
import {Observable, take} from "rxjs";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  id: string;
  self: Self;
  game: Game;

  constructor(private activatedRoute: ActivatedRoute,
              private gameService: GameService,
              private gameStore: Store<GameState>,
              private router: Router) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(map => {
      this.id = map.get("id") || "";
      this.gameService.initGameSocket(this.id);
    });
    this.gameStore.select(selectSelf).subscribe(self => {
      this.self = self;
    });
    this.getGame().subscribe(game => {
      this.game = game;
      if (this.game !== undefined && this.game.id !== '' && !this.game.players.find(player => player.id === this.self.id)) {
        console.log(this.game)
        this.router.navigate(['/']);
      }
    });
  }

  private getGame(): Observable<Game> {
    return this.gameStore.select(selectGame);
  }

  getOtherPlayers(internId: number): Player {
    return this.game.players.filter(player => player.id !== this.self.id)[internId];
  }

  leaveGame() {
    this.gameService.leaveGame(this.game, this.self.id);
    this.router.navigate(['/']);
  }

  kickPlayer(player: Player) {
    this.gameService.kickPlayer(this.game, player);
  }
}
