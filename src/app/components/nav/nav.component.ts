import { Component, EventEmitter, Output } from '@angular/core';

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
    { 
      name: 'Blog',
      path: 'blog', 
    },
  ]

  @Output() navToggleValue = new EventEmitter;
   
  inputClick(event: any){
    this.navToggleValue.emit(event.target.checked);
  }
}
