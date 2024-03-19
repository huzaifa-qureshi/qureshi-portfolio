import { Component, HostListener } from '@angular/core';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { CursorService } from 'src/app/services/cursor.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  animations: [
    fadeInOnEnterAnimation({duration: 1500, delay: 1500})
  ]
})
export class MainComponent {
  constructor(private cursorService: CursorService) {}
  
  onLinkHover() {
    this.cursorService.expandCursor(true);
  }

  onLinkLeave() {
    this.cursorService.expandCursor(false);
  }
}
