import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class MainSizeService {

  private screenSize = new BehaviorSubject({height: 0, width: 0});
  getSize = this.screenSize.asObservable()

  constructor() { }

  setSize(screenSize: any){
    this.screenSize.next(screenSize); 
  }
}
