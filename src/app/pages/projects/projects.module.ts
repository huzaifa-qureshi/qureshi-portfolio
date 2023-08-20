import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsPage } from './projects.page';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';



@NgModule({
  declarations: [
    ProjectsPage
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    ComponentsModule
  ]
})
export class ProjectsModule { }
