import { Component, HostListener, Input } from '@angular/core';

@Component({
  selector: 'image-tooltip',
  templateUrl: './image-tooltip.component.html',
  styleUrls: ['./image-tooltip.component.scss']
})
export class ImageTooltipComponent {
  top:any;
  left:any;
  @Input() image: string = '';
  constructor() {}

  @HostListener('document:mousemove', ['$event'])
    onMousemove($event: { pageY: number; pageX: number; }) {
      this.top=($event.pageY - 30)+ "px";
      this.left= ($event.pageX + 36)+ "px";
  }
}
