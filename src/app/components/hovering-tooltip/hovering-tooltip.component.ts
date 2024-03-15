import { Component, HostListener, Input } from '@angular/core';

@Component({
  selector: 'hovering-tooltip',
  templateUrl: './hovering-tooltip.component.html',
  styleUrls: ['./hovering-tooltip.component.scss']
})
export class HoveringTooltipComponent {
  top:any;
  left:any;
  @Input() tooltip: string = '';
  constructor() {}

  @HostListener('document:mousemove', ['$event'])
    onMousemove($event: { pageY: number; pageX: number; }) {
      this.top=($event.pageY - 30)+ "px";
      this.left= ($event.pageX + 10)+ "px";
  }
}
