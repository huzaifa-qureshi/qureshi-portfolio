import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { InfoComponent } from './info/info.page';
import { ContactComponent } from './contact/contact.page';
import { NgIconsModule } from '@ng-icons/core';
import { bootstrapBoxArrowUpRight} from '@ng-icons/bootstrap-icons';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [
    InfoComponent,
    ContactComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ComponentsModule,
    NgIconsModule.withIcons({bootstrapBoxArrowUpRight})
  ],
  exports: [
    InfoComponent,
    ContactComponent
  ]
})
export class PagesModule { }
