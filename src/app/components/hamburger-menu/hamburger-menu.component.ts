import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'hamburger-menu',
  templateUrl: './hamburger-menu.component.html',
  styleUrls: ['./hamburger-menu.component.scss']
})
export class HamburgerMenuComponent {
  @Output() navToggleValue = new EventEmitter;
   
  inputClick(event: any){
    this.navToggleValue.emit(event.target.checked);
  }
}
