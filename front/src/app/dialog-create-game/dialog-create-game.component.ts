// Angular Import
import {Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
// Material Import
import {MatDialogRef} from "@angular/material/dialog";
import {PreGameService} from '../pre-game.service';


@Component({
  selector: 'app-dialog-create-game',
  templateUrl: './dialog-create-game.component.html',
  styleUrls: ['./dialog-create-game.component.scss']
})
export class DialogCreateGameComponent {

  createGameForm: FormGroup = new FormGroup({
    gameName: new FormControl(""),
    playerName: new FormControl(""),
    gameIsPublic: new FormControl(""),
    difficulty: new FormControl("200"),
  })

  constructor(
    public dialogRef: MatDialogRef<DialogCreateGameComponent>,
    private preGameService: PreGameService,
  ) {
  }

  createGame(): void {
    this.preGameService.CreateGame(this.createGameForm.value);
    this.dialogRef.close();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  // Disabled Submit Form button if no value
  isDisabled(): boolean {
    return !(this.createGameForm.value.playerName && this.createGameForm.value.gameName && this.createGameForm.value.gameIsPublic !== "")
  }
}
