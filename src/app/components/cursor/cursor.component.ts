import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'cursor',
  templateUrl: './cursor.component.html',
  styleUrls: ['./cursor.component.scss']
})
export class CursorComponent {
  top:any;
  left:any;
  expand=false;

  constructor() {}


  @HostListener('document:click', ['$event'])
  onOver() {
     this.expand = true;
     setTimeout(() => {
      this.expand = false;
     }, 1000);
  }

  @HostListener('document:mousemove', ['$event'])
    onMousemove($event: { pageY: number; pageX: number; }) {
      this.top=($event.pageY - 10)+ "px";
      this.left= ($event.pageX - 10)+ "px";
  }
  }
