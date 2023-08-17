import { Component, ElementRef, Renderer2} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent { 
  title = 'qureshi-portfolio';
  
  constructor(private renderer: Renderer2, private el: ElementRef) {}
  
  

  toggleNav(event: boolean){
    const toggle = this.el.nativeElement.querySelectorAll('.toggle');
    toggle.forEach((element: any) => {
        if (event == true){
          this.renderer.addClass(element, 'toggle-true');
          console.log("here");
        }
        else{
          this.renderer.removeClass(element, 'toggle-true');
          console.log("not-here");
        }
    });
  }
}
