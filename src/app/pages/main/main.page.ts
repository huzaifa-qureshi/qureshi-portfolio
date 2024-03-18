import { Component, HostListener } from '@angular/core';
import { fadeInOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  animations: [
    fadeInOnEnterAnimation({duration: 1500, delay: 1500})
  ]
})
export class MainComponent {
  @HostListener('window:resize')
  onWindowResize() {
    location.reload();
  }
}
