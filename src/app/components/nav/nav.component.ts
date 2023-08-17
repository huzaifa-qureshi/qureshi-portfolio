import { Component } from '@angular/core';

@Component({
  selector: 'navigation',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  public navItems = [
    { 
      name: 'Projects',
      link: '', 
    },
    { 
      name: 'Info',
      link: '', 
    },
    { 
      name: 'Contact',
      link: '', 
    },
    { 
      name: 'Blog',
      link: '', 
    },
  ]
}
