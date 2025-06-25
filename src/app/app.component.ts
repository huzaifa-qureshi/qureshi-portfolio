import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  OnDestroy,
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
export class AppComponent implements AfterViewInit, OnDestroy {
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
  eventSubscription: any;  isdarkmode: boolean = false;
  isloading : boolean = true;
  isScrolling: boolean = false;
  private resizeTimeout: any;
  private initialDimensions: { width: number; height: number } | null = null;

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
    gsap.registerPlugin(ScrollTrigger);
    
    // Check if device is mobile
    const isMobile = window.innerWidth <= 768;
    
    // Create the curtain effect timeline with mobile optimizations
    const curtainTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '.main-container',
        start: '1 top',
        end: '160% top',
        pin: true,
        scrub: isMobile ? 1 : 4, // Faster scrub on mobile for better performance
        invalidateOnRefresh: true, // Recalculate on orientation change
        anticipatePin: 1, // Improve mobile performance
        refreshPriority: isMobile ? 1 : 0, // Higher priority refresh on mobile
        //markers: true,
        onUpdate: (self) => {
          //console.log('Curtain progress:', self.progress);
        }
      }
    });

    // Use shorter durations on mobile for smoother animation
    const animationDuration = isMobile ? 0.3 : 0.5;

    curtainTimeline.to('.screen-2', {
      height: 'calc(100dvh - var(--frame-size))',
      duration: animationDuration,
      ease: isMobile ? 'power2.out' : 'none',
    }, 1);

    curtainTimeline.to('.screen-3', {
      height: 'var(--frame-size)',
      duration: animationDuration,
      opacity: 1,
      ease: isMobile ? 'power2.out' : 'none',
    }, 1);

    curtainTimeline.to('.screen-3', {
      height: 'calc(100dvh - var(--frame-size))',
      duration: animationDuration,
      ease: isMobile ? 'power2.out' : 'none',
    }, 2);

    curtainTimeline.to('.screen-4', {
      height: 'var(--frame-size)',
      duration: animationDuration,
      opacity: 1,
      ease: isMobile ? 'power2.out' : 'none',
    }, 2);

    curtainTimeline.to('.screen-4', {
      height: 'calc(100dvh - var(--frame-size))',
      duration: animationDuration,
      ease: isMobile ? 'power2.out' : 'none',
    }, 3);

    curtainTimeline.to('.bottom', {
      height: 'var(--frame-size)',
      duration: animationDuration,
      opacity: 1,
      ease: isMobile ? 'power2.out' : 'none',
    }, 3); 

    // Add mobile-specific ScrollTrigger settings
    if (isMobile) {
      ScrollTrigger.config({
        autoRefreshEvents: "visibilitychange,DOMContentLoaded,load"
      });
    }

    this.maincontainersize = this.mainSize();
    this.screenSize.setSize(this.maincontainersize);
    
    // Store initial dimensions for resize detection
    this.initialDimensions = { 
      width: window.innerWidth, 
      height: window.innerHeight 
    };
    
    // console.log(this.currentRoute)
    // if(this.currentRoute == '/main' || this.currentRoute == '' ){
    //   this.showToolTipFn("Scroll once to see Magic!");
    // }
  }
  //#endregion
  
  navigateToNextRoute() {
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

  // loading(){
  //   setTimeout(() =>{ 
  //       this.isloading = false; 
  //   }, 5000);
  // }

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
    // Clear previous timeout to debounce resize events
    clearTimeout(this.resizeTimeout);
    
    // Only reload after resize has stopped for 500ms
    // This prevents reload during mobile scrolling which can trigger resize events
    this.resizeTimeout = setTimeout(() => {
      // Only reload if the window size actually changed significantly
      const currentWidth = window.innerWidth;
      const currentHeight = window.innerHeight;
      
      // Store the initial dimensions if not already stored
      if (!this.initialDimensions) {
        this.initialDimensions = { width: currentWidth, height: currentHeight };
        return;
      }
      
      // Only reload if width changed by more than 50px (orientation change or significant resize)
      const widthDiff = Math.abs(currentWidth - this.initialDimensions.width);
      const heightDiff = Math.abs(currentHeight - this.initialDimensions.height);
      
      if (widthDiff > 50 || heightDiff > 100) {
        this.initialDimensions = { width: currentWidth, height: currentHeight };
        location.reload();
      }
    }, 500);
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    // Prevent scroll bounce on iOS
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    // Allow normal scrolling but prevent zoom
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  }

  ngOnDestroy() {
    // Clean up ScrollTrigger instances
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    
    // Clear resize timeout
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
    
    // Clean up event subscription
    if (this.eventSubscription) {
      this.eventSubscription.unsubscribe();
    }
  }

  //#endregion
}
