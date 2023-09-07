import { Component, EventEmitter, Output, Renderer2 } from '@angular/core';
import { ModeService } from 'src/app/services/mode.service';

@Component({
  selector: 'mode-switch',
  templateUrl: './mode-switch.component.html',
  styleUrls: ['./mode-switch.component.scss']
})
export class ModeSwitchComponent {
  darkmode : boolean = false;
  
  constructor(private renderer : Renderer2, private modeservice: ModeService){}

  @Output() isDarkMode = new EventEmitter<boolean>();
  toggleMode() {
    this.darkmode = !this.darkmode;
    
    if (this.darkmode){
      this.renderer.addClass(document.body, 'dark-mode');
    }
    else {
      this.renderer.removeClass(document.body, 'dark-mode');
    }
    
    this.modeservice.setSize();
    
    this.isDarkMode.emit(this.darkmode);
  }

}
