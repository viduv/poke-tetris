import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {PreGameService} from "../pre-game.service";
import {Observable, of, map, from} from "rxjs";
import {filter} from "rxjs/operators"

@Component({
  selector: 'app-dialog-join-game',
  templateUrl: './dialog-join-game.component.html',
  styleUrls: ['./dialog-join-game.component.scss']
})
export class DialogJoinGameComponent implements OnInit {
  publicGames : Observable<any> = of("")
  Games : Observable<any> = of("")

  constructor(public dialogRef: MatDialogRef<DialogJoinGameComponent>, private preGameService: PreGameService) {}

  ngOnInit(): void {

    this.Games = this.preGameService.getGames()
    this.Games.subscribe(res => console.log(res))
    this.publicGames.subscribe(res => console.log(res))
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
