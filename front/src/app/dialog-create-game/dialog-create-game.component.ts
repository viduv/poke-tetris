import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-create-game',
  templateUrl: './dialog-create-game.component.html',
  styleUrls: ['./dialog-create-game.component.scss']
})
export class DialogCreateGameComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogCreateGameComponent>) { }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
