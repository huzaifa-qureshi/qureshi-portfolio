import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Output, ViewChild} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MainSizeService } from './services/main-size.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit { 
  title = 'qureshi-portfolio';
  
  @ViewChild('mc')
  main!: ElementRef;

  maincontainersize: any;
  collapseState: boolean = false;
  transitionState: any;
  eventSubscription: any;
  currentPosition: number = 0;
  routerLinks = ["main", "projects", "info" , "contact"];
  static indexLink: number;

  constructor(private router: Router, private screenSize: MainSizeService) {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) { 
        this.transitionState = true;
        setTimeout(() => {
          this.transitionState = false;
        }, 1200);
      }
    });
  }

  ngAfterViewInit(){
    this.maincontainersize = this.mainSize()
    this.screenSize.setSize(this.maincontainersize)
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
      console.log(this.maincontainersize)
    }
    else{
      this.collapseState = false;
    }
  }

  mainSize(){
    let mainSize = {
      height: this.main.nativeElement.offsetHeight,
      width: this.main.nativeElement.offsetWidth,
    }
    return mainSize;
  }
}

AppComponent.indexLink = 0;
