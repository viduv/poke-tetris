// Angular Import 
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
// Material Import
import {MatDialogRef} from "@angular/material/dialog";
// Ngrx Import
import {Store} from "@ngrx/store";
// Game Import
import {PreGameService} from "../pre-game.service";
import { PreGame } from "../stores/pre-game-store/pre-game";
import {PreGameState} from "../stores/pre-game-store/pre-game.state";
import {selectPreGamePublicGames} from "../stores/pre-game-store/pre-game.selector";
import {flushState} from "../stores/pre-game-store/pre-game.actions"
// Rxjs Import
import {Observable} from "rxjs";

@Component({
  selector: 'app-dialog-join-game',
  templateUrl: './dialog-join-game.component.html',
  styleUrls: ['./dialog-join-game.component.scss']
})
export class DialogJoinGameComponent implements OnInit {
  PublicGames : Observable<Array<PreGame>> = new Observable<Array<PreGame>>();
  Games : Observable<Array<PreGame>> = new Observable<Array<PreGame>>();
  gamesForm: FormGroup = new FormGroup({
    gameName : new FormControl(""),
    userName : new FormControl(""),
    gameSelect : new FormControl(""),
  })

  constructor(
    public dialogRef: MatDialogRef<DialogJoinGameComponent>,
    private preGameService: PreGameService,
    protected store: Store<PreGameState>,
    ) {}

  ngOnInit(): void {
    this.Games = this.preGameService.getGames()
    this.PublicGames = this.store.select(selectPreGamePublicGames)
  }

  joinGame() : void {
    this.dialogRef.close();
  }

  closeDialog(): void {
    this.store.dispatch(flushState())
    this.preGameService.flushGamesListSocket()
    this.dialogRef.close();
  }

  // Disabled Submit Form button if no value
  isDisabled(): boolean {
    let isDisabled : boolean = this.gamesForm.value.gameName && this.gamesForm.value.userName || this.gamesForm.value.gameSelect ? false : true
    return isDisabled
  }

}
