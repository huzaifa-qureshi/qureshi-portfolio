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
  
  //#region My Scroll Logic
  
  //Set Debounce on scroll event
  private scrollEvent$ = fromEvent(window, 'wheel').pipe(debounceTime(1000)); 

  ngAfterViewInit() {
    //Perform action every time the user scrolls
    this.scrollEvent$.subscribe((event: Event) => {
      //If the user is already scrolling, do nothing
      event.preventDefault(); 
      //If User keeps scrolling, alert them (Easter egg)
      const timeoutId = setTimeout(() => {
        if(this.scroolOnceToolTipCount % 8 == 6){
          this.showToolTipFn("Hey I said Scroll once!");
          this.scroolOnceToolTipCount++;
        }
      }, 4000); // Set timeout to 4 seconds
      const finalizeAction = () => {
        this.isScrolling = false;
        clearTimeout(timeoutId); // Clear the timeout when the action is done
      };

      //Scroll Down
      if ((event as WheelEvent).deltaY > 0) { 
        console.log("Scrolling down", 500);
        this.navservice.OnScroll(true).finally(() => {
          this.isScrolling = false; 
        });
      //Scroll Up
      } else {
        this.navservice.OnScroll(false).finally(() => {
          this.isScrolling = false; 
        });
      }  
    });
  
    this.maincontainersize = this.mainSize();
    this.screenSize.setSize(this.maincontainersize);
    this.loading();
    if(this.currentRoute == '/main'){
      this.showToolTipFn("Scroll once to see Magic!");
    }
  }
  //#endregion

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
