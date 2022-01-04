// Angular Import 
import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup} from '@angular/forms';
// Material Import
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-create-game',
  templateUrl: './dialog-create-game.component.html',
  styleUrls: ['./dialog-create-game.component.scss']
})
export class DialogCreateGameComponent implements OnInit {

  createGameForm: FormGroup = new FormGroup({
    gameName: new FormControl(""),
    userName: new FormControl(""),
  })

  constructor(public dialogRef: MatDialogRef<DialogCreateGameComponent>) { }

  ngOnInit(): void {
  }

  createGame(): void {
    console.log(this.createGameForm.value)
    this.dialogRef.close();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

    // Disabled Submit Form button if no value
    isDisabled(): boolean {
      let isDisabled : boolean = this.createGameForm.value.gameName && this.createGameForm.value.userName ? false : true
      return isDisabled
    }

}
