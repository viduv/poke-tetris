import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {PreGameService} from "../pre-game.service";
import {Observable} from "rxjs";
import {PreGame} from "../stores/pre-game-store/pre-game";

@Component({
  selector: 'app-dialog-join-game',
  templateUrl: './dialog-join-game.component.html',
  styleUrls: ['./dialog-join-game.component.scss']
})
export class DialogJoinGameComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogJoinGameComponent>, private preGameService: PreGameService) { }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  public getGames(): Observable<PreGame[]> {
    return this.preGameService.getGames();
  }

}
