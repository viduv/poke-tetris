import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {PreGameService} from "../pre-game.service";
import {Observable, of} from "rxjs";
import {PreGame} from "../stores/pre-game-store/pre-game";
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-dialog-join-game',
  templateUrl: './dialog-join-game.component.html',
  styleUrls: ['./dialog-join-game.component.scss']
})
export class DialogJoinGameComponent implements OnInit {
  x : Observable<any> = of([])

  constructor(public dialogRef: MatDialogRef<DialogJoinGameComponent>, private preGameService: PreGameService) {}

  ngOnInit(): void {
    this.x = this.preGameService.getGames();
    this.x.subscribe(res => console.log(res))

  }

  closeDialog(): void {
    this.dialogRef.close();
  }

 // public getGames(): Observable<string[]> {
 //   console.log("GEEEEEETTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT")
  //  return this.preGameService.getGames();
 // }

}
