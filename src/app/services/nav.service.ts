import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavService{
  routerLinks = ['/main', '/projects', '/info', '/contact'];
  currentPosition: number = 0;
  currentRoute: string = '/main';
  indexLink: number = 0;

  constructor(private router: Router) { 
    this.router.events
   .pipe(filter((event: any) => event instanceof NavigationEnd))
   .subscribe((event: any) => {
     this.currentRoute = event.url;
     const current = this.routerLinks.findIndex(link => link === this.currentRoute);
     this.indexLink = current;
    });
  }

  
  OnScroll(){
    let scroll = window.scrollY;
    // check scroll down
    if (scroll > this.currentPosition) {
      setTimeout(() => {
        this.indexLink =
          this.indexLink != 4 ? this.indexLink++ : 0;
        this.router.navigateByUrl(
          this.routerLinks[this.indexLink++],
        );
        window.scrollTo(0, 0);
      }, 200);
    }
    this.currentPosition = scroll;
  }

  nextSlide(){
    setTimeout(() => {
      this.indexLink =
        this.indexLink != 4 ? this.indexLink++ : 0;
      this.router.navigateByUrl(
        this.routerLinks[this.indexLink++],
      );
      window.scrollTo(0, 0);
    }, 200);
  }

  setPosition(){
    console.log(this.currentRoute);
    // this.indexLink = current;
  }
}
