import { AfterViewInit, Component, HostListener } from '@angular/core';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { BreakpointService } from 'src/app/services/breakpoint.service';
import { CursorService } from 'src/app/services/cursor.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
  animations: [
    fadeInOnEnterAnimation({duration: 1500, delay: 1500})
  ]
})
export class InfoComponent implements AfterViewInit {
  tooltip = '';
  showToolTip:boolean = false;
  constructor(private cursorService: CursorService, public breakpoint: BreakpointService) {}
  
  ngAfterViewInit() {
    //this.showToolTipFn('Use AWD or Arrow Keys to move the ship', 5000);
  }
  onLinkHover() {
    this.cursorService.expandCursor(true);
  }

  onLinkLeave() {
    this.cursorService.expandCursor(false);
  }

  showToolTipFn(tip:string, showAfter:number = 8000) {
    this.tooltip = tip;
    setTimeout(() => {
      this.showToolTip = true;
      setTimeout(() => {
        this.showToolTip = false;
      }, 4000); 
    }, showAfter);
  }
}
