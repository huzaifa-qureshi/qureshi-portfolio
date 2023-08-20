import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { InfoComponent } from './info/info.component';

@NgModule({
  declarations: [
    InfoComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
  ],
  exports: [
    InfoComponent
  ]
})
export class PagesModule { }
