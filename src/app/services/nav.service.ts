import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavService {
  routerLinks = ['/main', '/projects', '/info', '/contact'];
  currentPosition: number = 0;
  currentRoute: string = '/main';
  indexLink: number = 0;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentRoute = event.url;
        const current = this.routerLinks.findIndex(
          (link) => link === this.currentRoute,
        );
        this.indexLink = current;
      });
  }

  OnScroll(movedown: boolean): Promise<void> {
    return new Promise<void>((resolve) => {
      if (movedown == true) {
        this.indexLink = this.indexLink !== 3 ? this.indexLink + 1 : 0;
      } else {
        this.indexLink = this.indexLink !== 0 ? this.indexLink - 1 : 3;
      }
      this.router.navigateByUrl(this.routerLinks[this.indexLink]);
      resolve();
    });
  }

  nextSlide() {
    setTimeout(() => {
      this.indexLink = this.indexLink !== 3 ? this.indexLink + 1 : 0;
      this.router.navigateByUrl(this.routerLinks[this.indexLink++]);
    }, 200);
  }

  setPosition() {
    console.log(this.currentRoute);
    // this.indexLink = current;
  }
}
