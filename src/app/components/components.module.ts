import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HamburgerMenuComponent } from './hamburger-menu/hamburger-menu.component';
import { NavComponent } from './nav/nav.component';
import { CursorComponent } from './cursor/cursor.component';

@NgModule({
  declarations: [
    HamburgerMenuComponent,
    NavComponent,
    CursorComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HamburgerMenuComponent,
    NavComponent,
    CursorComponent
  ],
})
export class ComponentsModule { }
