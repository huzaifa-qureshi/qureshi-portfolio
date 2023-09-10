import { Injectable, effect, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModeService {
  isdarkmode = signal(false)

  constructor() {}

  setSize(){
    this.isdarkmode.update(value => !value) 
  }
}
