import {Component, HostBinding, HostListener, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-spectrum-column',
  templateUrl: './spectrum-column.component.html',
  styleUrls: ['./spectrum-column.component.scss']
})
export class SpectrumColumnComponent implements OnInit {

  @HostBinding("style.--columnSize")
  @Input() columnSize: number;

  constructor() { }

  ngOnInit(): void {

  }

}
