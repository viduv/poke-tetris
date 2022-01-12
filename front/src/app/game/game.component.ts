import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {GameService} from "../game.service";
import {Self} from "../stores/game-store/self";
import {Game} from "../stores/game-store/game";
import {Player} from "../model/player";
import {Store} from "@ngrx/store";
import {GameState} from "../stores/game-store/game.state";
import {selectGame, selectSelf} from "../stores/game-store/game.selector";
import {Observable, take} from "rxjs";
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  id: string;
  self: Self;

  constructor(private activatedRoute: ActivatedRoute,
              private gameService: GameService,
              protected gameStore: Store<GameState>) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(map => {
      this.id = map.get("id") || "";
      this.gameService.initGameSocket(this.id);
    });
    this.gameStore.select(selectSelf).subscribe(self => {
      this.self = self;
    });
  }

  getGame(): Observable<Game> {
    return this.gameStore.select(selectGame);
  }

  getOtherPlayers(internId: number): Observable<Player> {
    console.log("getOtherPlayers", internId)
    this.getGame().pipe(take(1)).subscribe(value => console.log(value))
    return this.getGame().pipe(map(game => game.players.filter(player => player.id !== this.self.id)[internId]));
  }
}
