import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsPage } from './projects.page';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { NgIconsModule } from '@ng-icons/core';
import { bootstrapBoxArrowUpRight, bootstrapGithub } from '@ng-icons/bootstrap-icons';


@NgModule({
  declarations: [
    ProjectsPage
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    ComponentsModule,
    NgIconsModule.withIcons({bootstrapBoxArrowUpRight, bootstrapGithub}),
  ],
  exports: [
    ProjectsPage
  ]
})
export class ProjectsModule { }
