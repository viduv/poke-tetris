import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-spectrum-board',
  templateUrl: './spectrum-board.component.html',
  styleUrls: ['./spectrum-board.component.scss']
})
export class SpectrumBoardComponent {
  @Input() spectrum: Array<number> | undefined;
}
