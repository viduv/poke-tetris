import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GameService} from "../game.service";
import {Self} from "../stores/game-store/self";
import {Game} from "../stores/game-store/game";
import {Player} from "../model/player";
import {Store} from "@ngrx/store";
import {GameState} from "../stores/game-store/game.state";
import {selectGame, selectSelf} from "../stores/game-store/game.selector";
import {Observable} from "rxjs";
import {first} from "rxjs/operators";
import {PreGameService} from "../pre-game.service";
import { flushState } from '../stores/game-store/game.actions';
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
// You can access to this page using the UI, or passing parameters id/[username] on the url
  id: string;
  self: Self;
  game: Game;
  username : string = ""
  isDirectAcces : boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
              private gameService: GameService,
              private gameStore: Store<GameState>,
              private router: Router,
              private preGameService: PreGameService,
              ) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(first()).subscribe(map => {
      this.id = map.get("id") || "";
      if (this.id.includes("[") && this.id.includes("]")){
        if(this.id.indexOf("[") < this.id.indexOf("]") - 1){
          this.username = this.id.substring( this.id.indexOf("[") + 1, this.id.indexOf("]"))
          this.id = this.id.replace("[" + this.username + "]", "")
          this.preGameService.JoinGame(
            {
            gameId: this.id,
            playerName: this.username,
            },
            "game"
        )
            // We must add isDirectAccess to not navigate to root 
            // because self subscribe take time to get the data (for sure that is not the best solution)
            this.isDirectAcces = true
        }
      }
      this.gameService.initGameSocket(this.id);
    });
    this.gameStore.select(selectSelf).subscribe(self => {
      this.self = self;
    });
    if (!this.isDirectAcces && this.self.id === ""){ 
      this.router.navigate(['/']);
    }
    this.getGame().subscribe(game => {
      this.game = game;
    })
    //this.getGame().subscribe(game => {
     // this.game = game;
    
      // if (this.game !== undefined && this.game.id !== '' && !this.game.players.find(player => player.id === this.self.id)) {
      //   this.router.navigate(['/']);
      // }
  //  });
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
