import { Component, HostListener } from '@angular/core';
import { CursorService } from 'src/app/services/cursor.service';

@Component({
  selector: 'cursor',
  templateUrl: './cursor.component.html',
  styleUrls: ['./cursor.component.scss']
})
export class CursorComponent {
  top:any;
  left:any;
  expand=false;

  constructor(private cursorService: CursorService) {
    this.cursorService.expandCursor$.subscribe(expand => {
      this.expand = expand;
    });
  }

  @HostListener('document:mousemove', ['$event'])
    onMousemove($event: { pageY: number; pageX: number; }) {
      this.top=($event.pageY - 10)+ "px";
      this.left= ($event.pageX - 10)+ "px";
  }
  }
