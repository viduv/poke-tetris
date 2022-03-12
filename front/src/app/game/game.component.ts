import {Component, HostListener, OnInit} from '@angular/core';
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
import {MatSnackBar} from "@angular/material/snack-bar";
import { flushState } from '../stores/game-store/game.actions';
import {GameplayService} from "../gameplay.service";
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
  isDirectAccess : boolean = false;
  subscribe : any;

  constructor(private activatedRoute: ActivatedRoute,
              private gameService: GameService,
              private gameStore: Store<GameState>,
              private router: Router,
              private preGameService: PreGameService,
              private snackBar: MatSnackBar,
              private gameplayService: GameplayService
              ) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(first()).subscribe(map => {
      this.id = map.get("id") || "";
      // Parse url
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
            // We must add isDirectAccess boolean to know if the url is correct and not navigate to root
            // because self subscribe take time to get the data (for sure that is not the best solution)
            this.isDirectAccess = true
        }
      }
      this.gameService.initGameSocket(this.id);
    });
    this.gameStore.select(selectSelf).subscribe(self => {
      this.self = self;
    });
    if (!this.isDirectAccess && this.self.id === ""){
      this.router.navigate(['/']);
    }
    this.subscribe = this.getGame().subscribe(game => {
      this.game = game;
      // Handling Kiking someone of the game
      if (this.subscribe && this.game !== undefined && this.game.id !== '' && !this.game.players.find(player => player.id === this.self.id))
      {
        this.snackBar.open("Vous avez été expulsé de la partie", "Fermer", {
          duration: 6000,
          verticalPosition: "top",
          horizontalPosition: "center"
        });
        this.router.navigate(['/']);
        this.subscribe.unsubscribe()
      }
    })
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

  startGame() {
    this.gameService.startGame(this.game);
    this.gameplayService.start();
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
      if (event.key === "b")
        this.gameplayService.update();
  }

}
