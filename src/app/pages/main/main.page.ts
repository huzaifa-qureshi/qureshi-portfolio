import { Component } from '@angular/core';
import { fadeInOnEnterAnimation, fadeInUpOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  animations: [
    fadeInOnEnterAnimation({duration:1000, delay: 200})
  ]
})
export class MainComponent {

}
