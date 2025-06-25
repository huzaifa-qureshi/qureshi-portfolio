import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BreakpointService } from './services/breakpoint.service';
import { CursorService } from './services/cursor.service';
import { MainSizeService } from './services/main-size.service';
import { NavService } from './services/nav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit, OnDestroy {
  title = 'qureshi-portfolio';
  tooltip = '';
  showToolTip: boolean = false;
  scroolOnceToolTipCount: number = 0;
  currentRoute: string = '';
  @ViewChild('mc') main!: ElementRef;

  maincontainersize: any;
  collapseState: boolean = false;
  transitionState: any;
  eventSubscription: any;
  isdarkmode: boolean = false;
  isloading: boolean = true;
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
    
    const isMobile = window.innerWidth <= 768;
    
    const curtainTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '.main-container',
        start: '1 top',
        end: '160% top',
        pin: true,
        scrub: isMobile ? 1 : 4,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        refreshPriority: isMobile ? 1 : 0
      }
    });

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

    if (isMobile) {
      ScrollTrigger.config({
        autoRefreshEvents: "visibilitychange,DOMContentLoaded,load"
      });
    }

    this.maincontainersize = this.mainSize();
    this.screenSize.setSize(this.maincontainersize);
    
    this.initialDimensions = { 
      width: window.innerWidth, 
      height: window.innerHeight 
    };
  }
  
  navigateToNextRoute() {
    const routes = ['main', 'projects', 'info', 'contact'];
    const currentRoute = this.currentRoute.replace('/', '') || 'main';
    const currentIndex = routes.indexOf(currentRoute);
    const nextIndex = (currentIndex + 1) % routes.length;
    
    console.log('Navigating from', currentRoute, 'to', routes[nextIndex]);
    this.router.navigate([routes[nextIndex]]);
  }

  toggleNav(event: boolean) {
    this.collapseState = event;
  }

  mainSize() {
    return {
      height: 1000,
      width: 1000
    };
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

  showToolTipFn(tip: string, showAfter: number = 8000) {
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
    clearTimeout(this.resizeTimeout);
    
    this.resizeTimeout = setTimeout(() => {
      const currentWidth = window.innerWidth;
      const currentHeight = window.innerHeight;
      
      if (!this.initialDimensions) {
        this.initialDimensions = { width: currentWidth, height: currentHeight };
        return;
      }
      
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
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  }

  ngOnDestroy() {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
    
    if (this.eventSubscription) {
      this.eventSubscription.unsubscribe();
    }
  }
}
