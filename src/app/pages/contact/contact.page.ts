import { Component } from '@angular/core';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { CursorService } from 'src/app/services/cursor.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
  animations: [
    fadeInOnEnterAnimation({duration: 1500, delay: 1500})
  ]
})
export class ContactComponent {

  constructor(private cursorService: CursorService) {}
  
  onLinkHover(index?:any) {
    this.cursorService.expandCursor(true);
  }

  onLinkLeave() {
    this.cursorService.expandCursor(false);
  }
}
