import {Component, HostBinding, Input} from '@angular/core';

@Component({
  selector: 'app-spectrum-column',
  templateUrl: './spectrum-column.component.html',
  styleUrls: ['./spectrum-column.component.scss']
})
export class SpectrumColumnComponent {

  @HostBinding("style.--columnSize")
  @Input() columnSize: number;
}
