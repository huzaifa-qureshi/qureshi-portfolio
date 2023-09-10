import { Component } from '@angular/core';
import { NavService } from 'src/app/services/nav.service';

@Component({
  selector: 'next-slide-btn',
  templateUrl: './next-slide-btn.component.html',
  styleUrls: ['./next-slide-btn.component.scss']
})
export class NextSlideBtnComponent {

  constructor(private navservice:NavService){}

  nextSlide(){
    this.navservice.nextSlide();
  }
}
