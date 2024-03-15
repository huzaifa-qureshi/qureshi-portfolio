import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'hamburger-menu',
  templateUrl: './hamburger-menu.component.html',
  styleUrls: ['./hamburger-menu.component.scss']
})
export class HamburgerMenuComponent { 
  @ViewChild('checkbox') menu!: ElementRef;

  @Input() 
  set uncheckmenu(value: boolean) {
    this.menu.nativeElement.checked = value;
  }

  @Output() navToggleValue = new EventEmitter;
   
  inputClick(event: any){
    this.navToggleValue.emit(event.target.checked);
  }
}
