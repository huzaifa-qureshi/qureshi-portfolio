import { Component } from '@angular/core';
import { InfoComponent } from 'src/app/pages/info/info.page';
import { MainComponent } from 'src/app/pages/main/main.page';

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
}
