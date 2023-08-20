import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HamburgerMenuComponent } from './hamburger-menu/hamburger-menu.component';
import { NavComponent } from './nav/nav.component';
import { CursorComponent } from './cursor/cursor.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HamburgerMenuComponent,
    NavComponent,
    CursorComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HamburgerMenuComponent,
    NavComponent,
    CursorComponent
  ],
})
export class ComponentsModule { }
