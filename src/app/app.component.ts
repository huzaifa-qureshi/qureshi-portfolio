import { Component, HostListener} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { fromEvent } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent { 
  title = 'qureshi-portfolio';
  collapseState: boolean = false;
  transitionState: any;
  eventSubscription: any;
  
  constructor(private router: Router) {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) { 
        this.transitionState = true;
        setTimeout(() => {
          this.transitionState = false;
        }, 1200);
      }
    });

    this.eventSubscription = fromEvent(window, "scroll").subscribe(e => {
      this.onWindowScroll();
  });
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
      this.router.navigateByUrl("/info")
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
