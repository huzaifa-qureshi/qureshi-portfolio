import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.page';
import { MainRoutingModule } from './main-routing.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { NgIconsModule } from '@ng-icons/core';
import { bootstrapGithub, bootstrapLinkedin } from '@ng-icons/bootstrap-icons';

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    ComponentsModule,
    NgIconsModule.withIcons({bootstrapGithub, bootstrapLinkedin})
  ]
})
export class MainModule { }
