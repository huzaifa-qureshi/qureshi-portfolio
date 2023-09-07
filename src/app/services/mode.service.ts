import { Injectable, effect, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModeService {
  isdarkmode = signal(false)

  constructor() {
    effect(() => {
      console.log("heylol", this.isdarkmode());
    });
  }

  setSize(){
    this.isdarkmode.update(value => !value) 
  }
}
