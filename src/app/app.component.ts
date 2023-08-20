import { Component} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent { 
  title = 'qureshi-portfolio';
  collapseState: boolean = false;
  transitionState: any;
  
  constructor(private router: Router) {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) { 
        this.transitionState = true;
        setTimeout(() => {
          this.transitionState = false;
        }, 1200);
      }
    });
  }
  
  toggleNav(event: boolean){
    if (event == true){
      this.collapseState = true;
    }
    else{
      this.collapseState = false;
    }
  }


}
