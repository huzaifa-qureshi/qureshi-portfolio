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
        end: '100% top',
        pin: true,
        scrub: 4,
        markers: true,
        onUpdate: (self) => {
          console.log('Curtain progress:', self.progress);
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
    }, 3)

    // curtainTimeline.reverse();

    // curtainTimeline.to('.bottom', {
    //   onStart: () => {
    //     window.scrollTo({ top: 0, behavior: 'auto' });
    //     // this.navigateToNextRoute();
    //   },
    //   opacity: 0,
    // });

    // Phase 2: Hold the curtain position briefly
    // curtainTimeline.to('.bottom', {
    //   height: 'calc(100dvh - var(--frame-size))',
    //   duration: 0.3,
    // });

    // Phase 3: Bottom section returns to original position (curtain opens)
    // curtainTimeline.to('.bottom', {
    //   height: 'var(--frame-size)',
    //   duration: 0.15,
    //   onStart: () => {
    //     // Trigger route change at the start of curtain opening
    //     window.scrollTo({ top: 0, behavior: 'auto' });
    //     this.navigateToNextRoute();
    //   }
    // });

    // curtainTimeline.to('.bottom', {
      
    // })
    // // Create a master timeline for the curtain effect
    // const curtainTimeline = gsap.timeline({
    //   scrollTrigger: {
    //     trigger: '.main-container',
    //     start: '1% top',
    //     end: '50% top',
    //     pin: true,
    //     scrub: 4, // Smooth scrubbing tied to scroll progress
    //     markers: true,
    //     onUpdate: (self) => {
    //       console.log('Curtain progress:', self.progress);
    //     }
    //   }
    // });

    // // First: Collapse the middle section by changing grid-template-rows
    // curtainTimeline.to('.left, .center, .right', {
    //   gridTemplateRows: 'var(--frame-size) 0 10dvh',
    //   duration: 3,
    // });

    // // Second: Move the bottom curtains up to fill the screen
    // curtainTimeline.to('.bl, .br, .bc', {
    //   height: 'calc(100dvh - var(--frame-size))',
    //   duration: 0.5,  
    // }, 1);


    // //Perform action every time the user scrolls
    // this.scrollEvent$.subscribe((event: Event) => {
    //   //If the user is already scrolling, do nothing
    //   event.preventDefault(); 
    //   //If User keeps scrolling, alert them (Easter egg)
    //   const timeoutId = setTimeout(() => {
    //     if(this.scroolOnceToolTipCount % 4 == 3){
    //       this.showToolTipFn("Hey I said Scroll once!");
    //       this.scroolOnceToolTipCount++;
    //     }
    //   }, 4000); // Set timeout to 4 seconds
    //   const finalizeAction = () => {
    //     this.isScrolling = false;
    //     clearTimeout(timeoutId); // Clear the timeout when the action is done
    //   };

    //   //Scroll Down
    //   if ((event as WheelEvent).deltaY > 0) { 
    //     console.log("Scrolling down", 500);
    //     this.navservice.OnScroll(true).finally(() => {
    //       this.isScrolling = false; 
    //     });
    //   //Scroll Up
    //   } else {
    //     this.navservice.OnScroll(false).finally(() => {
    //       this.isScrolling = false; 
    //     });
    //   }  
    // });
  
    this.maincontainersize = this.mainSize();
    this.screenSize.setSize(this.maincontainersize);
    this.loading();
    console.log(this.currentRoute)
    if(this.currentRoute == '/main' || this.currentRoute == '' ){
      this.showToolTipFn("Scroll once to see Magic!");
    }
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
      height: this.main.nativeElement.offsetHeight,
      width: this.main.nativeElement.offsetWidth,
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
