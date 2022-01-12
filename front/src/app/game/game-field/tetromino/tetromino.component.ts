import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-tetromino',
  templateUrl: './tetromino.component.html',
  styleUrls: ['./tetromino.component.scss']
})
export class TetrominoComponent implements OnInit {

  @Input() type: 'T' | 'S' | 'Z' | 'L' | 'J';

  constructor() { }

  ngOnInit(): void {
  }

}
