import { Component } from '@angular/core';
import { fadeInOnEnterAnimation, fadeOutAnimation } from 'angular-animations';

@Component({
  selector: 'loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  animations: [ 
    fadeInOnEnterAnimation({duration: 1000}),
    fadeOutAnimation({duration:1000, delay: 2000})
  ]
})
export class LoaderComponent {

}
