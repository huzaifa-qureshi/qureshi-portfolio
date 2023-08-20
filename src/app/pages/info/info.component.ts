import { Component } from '@angular/core';
import { fadeInOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
  animations: [
    fadeInOnEnterAnimation({duration: 1500, delay: 1500})
  ]
})
export class InfoComponent {

}
