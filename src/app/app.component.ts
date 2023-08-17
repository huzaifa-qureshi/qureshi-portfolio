import { Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent { 
  title = 'qureshi-portfolio';
  navOpen = true;
// maincomponent , tr ,br

  toggleNav(event: any){
    this.navOpen = !this.navOpen;
  }
}
