import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MainSizeService } from './services/main-size.service';
import { BreakpointService } from './services/breakpoint.service';
import { NavService } from './services/nav.service';
import { fadeInOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    fadeInOnEnterAnimation({duration: 1500, delay: 3000})
  ]
})
export class AppComponent implements AfterViewInit {
  title = 'qureshi-portfolio';

  @ViewChild('mc')
  main!: ElementRef;

  maincontainersize: any;
  collapseState: boolean = false;
  transitionState: any;
  eventSubscription: any;
  isdarkmode: boolean = false;
  isloading : boolean = true;

  constructor(
    private router: Router,
    private screenSize: MainSizeService,
    public breakpoint: BreakpointService,
    private navservice: NavService,
  ) {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.transitionState = true;
        setTimeout(() => {
          this.transitionState = false;
        }, 1200);
      }
    });
  }

  ngAfterViewInit() {
    this.maincontainersize = this.mainSize();
    this.screenSize.setSize(this.maincontainersize);
    this.loading();
  }

  @HostListener('window:scroll', ['$event'])
  onContentScrolled() {
    this.navservice.OnScroll();
  }

  toggleNav(event: boolean) {
    if (event == true) {
      this.collapseState = true;
    } else {
      this.collapseState = false;
    }
  }

  mainSize() {
    let mainSize = {
      height: this.main.nativeElement.offsetHeight,
      width: this.main.nativeElement.offsetWidth,
    };
    return mainSize;
  }

  toggleMode(isdarkmode: boolean) {
    this.isdarkmode = isdarkmode;
  }

  loading(){
    setTimeout(() =>{ 
        this.isloading = false; 
    }, 3000);
  }
}
