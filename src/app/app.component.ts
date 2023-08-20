import { Component} from '@angular/core';
import { collapseAnimation, collapseOnLeaveAnimation } from 'angular-animations';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    collapseOnLeaveAnimation()
  ]
})
export class AppComponent { 
  title = 'qureshi-portfolio';
  collapseState: boolean = false;
  transitionState: any;
  
  constructor() {}
  
  toggleNav(event: boolean){

    if (event == true){
      this.collapseState = true;
    }
    else{
      this.collapseState = false;
    }
  }

}
