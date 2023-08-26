import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HamburgerMenuComponent } from './hamburger-menu/hamburger-menu.component';
import { NavComponent } from './nav/nav.component';
import { CursorComponent } from './cursor/cursor.component';
import { RouterModule } from '@angular/router';
import { BgModelComponent } from './bg-model/bg-model.component';
import { ModeSwitchComponent } from './mode-switch/mode-switch.component';

@NgModule({
  declarations: [
    HamburgerMenuComponent,
    NavComponent,
    CursorComponent,
    BgModelComponent,
    ModeSwitchComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HamburgerMenuComponent,
    NavComponent,
    CursorComponent,
    BgModelComponent,
    ModeSwitchComponent
  ],
})
export class ComponentsModule { }
