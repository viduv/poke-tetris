import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-spectrum-board',
  templateUrl: './spectrum-board.component.html',
  styleUrls: ['./spectrum-board.component.scss']
})
export class SpectrumBoardComponent implements OnInit {

  @Input() spectrum: Array<number> | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
