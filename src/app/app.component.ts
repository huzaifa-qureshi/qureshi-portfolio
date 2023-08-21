import { Component, HostListener} from '@angular/core';
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
  eventSubscription: any;
  currentPosition: number = 0;
  routerLinks = ["main", "projects", "info" , "contact"];
  static indexLink: number;

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


  @HostListener('window:scroll', ['$event'])
  onContentScrolled() {
    let scroll = window.scrollY;
    // check scroll down
    if (scroll > this.currentPosition) {
      setTimeout(() => {
        AppComponent.indexLink = AppComponent.indexLink != 4 ? AppComponent.indexLink++ : 0;  
        console.log(AppComponent.indexLink)
        this.router.navigateByUrl("/" + this.routerLinks[AppComponent.indexLink++]);
      }, 200);
    } 
    this.currentPosition = scroll;
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

AppComponent.indexLink = 0;
