import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { InfoComponent } from './info/info.page';
import { ContactComponent } from './contact/contact.page';


@NgModule({
  declarations: [
    InfoComponent,
    ContactComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
  ],
  exports: [
    InfoComponent,
    ContactComponent
  ]
})
export class PagesModule { }
