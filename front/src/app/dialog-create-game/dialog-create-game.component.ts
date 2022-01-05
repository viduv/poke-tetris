// Angular Import 
import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup} from '@angular/forms';
// Material Import
import {MatDialogRef} from "@angular/material/dialog";
import { PreGameService } from '../pre-game.service';

@Component({
  selector: 'app-dialog-create-game',
  templateUrl: './dialog-create-game.component.html',
  styleUrls: ['./dialog-create-game.component.scss']
})
export class DialogCreateGameComponent implements OnInit {

  createGameForm: FormGroup = new FormGroup({
    gameName: new FormControl(""),
    playerName: new FormControl(""),
    gameIsPublic: new FormControl(""),
  })

  constructor(
    public dialogRef: MatDialogRef<DialogCreateGameComponent>,
    private preGameService: PreGameService,
    ) { }

  ngOnInit(): void {
  }

  createGame(): void {
    console.log(this.createGameForm.value)
    this.preGameService.CreateGame(this.createGameForm.value)
    this.dialogRef.close();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

    // Disabled Submit Form button if no value
    isDisabled(): boolean {
      let isDisabled : boolean = this.createGameForm.value.playerName && this.createGameForm.value.gameName && this.createGameForm.value.gameIsPublic !== "" ? false : true
      return isDisabled
    }

}
