import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HamburgerMenuComponent } from './hamburger-menu/hamburger-menu.component';
import { NavComponent } from './nav/nav.component';

@NgModule({
  declarations: [
    HamburgerMenuComponent,
    NavComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HamburgerMenuComponent,
    NavComponent
  ],
})
export class ComponentsModule { }
