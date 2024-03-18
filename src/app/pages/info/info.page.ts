import { Component, HostListener } from '@angular/core';
import { fadeInOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
  animations: [
    fadeInOnEnterAnimation({duration: 1500, delay: 1500})
  ]
})
export class InfoComponent {
  @HostListener('window:resize')
  onWindowResize() {
    location.reload();
  }
}
