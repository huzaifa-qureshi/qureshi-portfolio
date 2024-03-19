import { Component, EventEmitter, Output } from '@angular/core';
import { CursorService } from 'src/app/services/cursor.service';

@Component({
  selector: 'navigation',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  public navItems = [
    { 
      name: 'Home',
      path: 'main',
    },
    { 
      name: 'Projects',
      path: 'projects', 
    },
    { 
      name: 'Info',
      path: 'info',
    },
    { 
      name: 'Contact',
      path: 'contact', 
    },
  ]
  @Output() navToggleValue = new EventEmitter;
  
  constructor(private cursorService: CursorService) {}
  
  onLinkHover() {
    this.cursorService.expandCursor(true);
  }

  onLinkLeave() {
    this.cursorService.expandCursor(false);
  }

  inputClick(event: any){
    this.navToggleValue.emit(event.target.checked);
  }
}
