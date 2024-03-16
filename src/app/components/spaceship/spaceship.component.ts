import { Component, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-spaceship',
  templateUrl: './spaceship.component.html',
  styleUrls: ['./spaceship.component.scss']
})
export class SpaceshipComponent {
  top:any;
  left:any;
  rotation = "0deg";
  constructor() {}

  @HostListener('document:mousemove', ['$event'])
  onMouseMove($event: { pageY: number; pageX: number; }) {
    const xDiff = $event.pageX - parseInt(this.left);
    const yDiff = $event.pageY - parseInt(this.top);
    const angle = Math.atan2(yDiff, xDiff) * (180 / Math.PI);

    this.top = ($event.pageY) + "px";
    this.left = ($event.pageX) + "px";
    this.rotation = angle + "deg";
  }
}
