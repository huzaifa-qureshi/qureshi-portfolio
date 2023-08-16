import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.page';
import { MainRoutingModule } from './main-routing.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    ComponentsModule
  ]
})
export class MainModule { }
