import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DialogCreateGameComponent} from "../dialog-create-game/dialog-create-game.component";
import {DialogJoinGameComponent} from "../dialog-join-game/dialog-join-game.component";
import {Piece} from "../model/pieces/piece";
import {GameService} from "../game.service";

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {

  constructor(public dialog: MatDialog, private gameService: GameService) {
  }

  presentationPiece: Piece;

  ngOnInit(): void {
    setInterval(() => {
      this.presentationPiece = this.gameService.pieceNumberToPiece(Math.trunc(Math.random() * 6 + 1), 0, -2, {height: 2, width: 3});
    }, 500);
  }

  openDialogCreate(): void {
    this.dialog.open(DialogCreateGameComponent, {width: '60%'});
  }

  openDialogJoin(): void {
    this.dialog.open(DialogJoinGameComponent, {width: '60%'});
  }

}
