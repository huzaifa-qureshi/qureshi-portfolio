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
import { debounceTime, fromEvent, throttleTime } from 'rxjs';
import { CursorService } from './services/cursor.service';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
  tooltip = '';
  showToolTip:boolean = false;
  scroolOnceToolTipCount: number = 0;
  currentRoute: string = '';
  @ViewChild('mc')
  main!: ElementRef;

  maincontainersize: any;
  collapseState: boolean = false;
  transitionState: any;
  eventSubscription: any;
  isdarkmode: boolean = false;
  isloading : boolean = true;
  isScrolling: boolean = false;

  constructor(
    private router: Router,
    private screenSize: MainSizeService,
    public breakpoint: BreakpointService,
    private navservice: NavService,
    private cursorService: CursorService,
  ) {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.currentRoute = ev.urlAfterRedirects;
        this.transitionState = true;
        setTimeout(() => {
          this.transitionState = false;
        }, 1000);
      }
    });
  }
  
  ngAfterViewInit() {
    this.isloading = false;

    gsap.registerPlugin(ScrollTrigger);
    
    // Create the curtain effect timeline
    const curtainTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '.main-container',
        start: '1 top',
        end: '160% top',
        pin: true,
        scrub: 4,
        //markers: true,
        onUpdate: (self) => {
          //console.log('Curtain progress:', self.progress);
        }
      }
    });

    curtainTimeline.to('.screen-2', {
      height: 'calc(100dvh - var(--frame-size))',
      duration: 0.5,
    }, 1);

    curtainTimeline.to('.screen-3', {
      height: 'var(--frame-size)',
      duration: 0.5,
    }, 1);

    curtainTimeline.to('.screen-3', {
      height: 'calc(100dvh - var(--frame-size))',
      duration: 0.5,
    }, 2);

    curtainTimeline.to('.screen-4', {
      height: 'var(--frame-size)',
      duration: 0.5,
    }, 2);


    curtainTimeline.to('.screen-4', {
      height: 'calc(100dvh - var(--frame-size))',
      duration: 0.5,
    }, 3);

    curtainTimeline.to('.bottom', {
      height: 'var(--frame-size)',
      duration: 0.5,
    }, 3); 

    this.maincontainersize = this.mainSize();
    this.screenSize.setSize(this.maincontainersize);
    // this.loading();
    // console.log(this.currentRoute)
    // if(this.currentRoute == '/main' || this.currentRoute == '' ){
    //   this.showToolTipFn("Scroll once to see Magic!");
    // }
  }
  //#endregion
  // Navigation method for curtain effect
  navigateToNextRoute() {
    // Define your route sequence based on your actual routes
    const routes = ['main', 'projects', 'info', 'contact'];
    const currentRoute = this.currentRoute.replace('/', '') || 'main';
    const currentIndex = routes.indexOf(currentRoute);
    const nextIndex = (currentIndex + 1) % routes.length;
    
    console.log('Navigating from', currentRoute, 'to', routes[nextIndex]);
    this.router.navigate([routes[nextIndex]]);
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
      // height: this.main.nativeElement.offsetHeight,
      // width: this.main.nativeElement.offsetWidth,
      height: 1000,
      width:1000
    };
    return mainSize;
  }

  toggleMode(isdarkmode: boolean) {
    this.isdarkmode = isdarkmode;
  }

  onLinkHover() {
    this.cursorService.expandCursor(true);
  }

  onLinkLeave() {
    this.cursorService.expandCursor(false);
  }

  loading(){
    setTimeout(() =>{ 
        this.isloading = false; 
    }, 3000);
  }

  showToolTipFn(tip:string, showAfter:number = 8000) {
    this.tooltip = tip;
    setTimeout(() => {
      this.showToolTip = true;
      setTimeout(() => {
        this.showToolTip = false;
      }, 3000); 
    }, showAfter);
  }

  @HostListener('window:resize')
  onWindowResize() {
    location.reload();
  }
}
