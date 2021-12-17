import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DialogCreateGameComponent} from "../dialog-create-game/dialog-create-game.component";
import {DialogJoinGameComponent} from "../dialog-join-game/dialog-join-game.component";

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialogCreate(): void {
    this.dialog.open(DialogCreateGameComponent, { width: '60%' });
  }

  openDialogJoin(): void {
    this.dialog.open(DialogJoinGameComponent, { width: '60%' });
  }

}
