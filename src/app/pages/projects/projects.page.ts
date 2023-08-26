import { AfterViewInit, Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { fadeInOnEnterAnimation } from 'angular-animations';

const projects =[
  {
    name : 'Daily FrontEnd',
    githubLink : '',
    projectLink: 'https://dailyfrontend.dev/',
    caption: 'Design and Development | 2023',
  },
  {
    name : 'ScholarLink Scholarship Portal',
    githubLink : '',
    projectLink: 'https://scholarship-portal-e69c1.web.app/#/home',
    caption: 'Design and Development | 2023',
  },
  {
    name : 'ESP32 Bluetooth App',
    githubLink : '',
    projectLink: '',
    caption: 'Development | 2023',
  },
  {
    name : 'Book Review App',
    githubLink : '',
    projectLink: '',
    caption: 'Development | 2023',
  },
  {
    name : 'Django Final Project',
    githubLink : '',
    projectLink: '',
    caption: 'Development | 2023',
  },
  {
    name : 'Flask Project',
    githubLink : '',
    projectLink: '',
    caption: 'Development | 2023',
  },
  {
    name : 'Tech Tree',
    githubLink : '',
    projectLink: '',
    caption: 'Design and Development | 2023',
  },
  {
    name : 'NDS',
    githubLink : '',
    projectLink: '',
    caption: 'Design and Development | 2023',
  },
]

@Component({
  selector: 'app-projects',
  templateUrl: './projects.page.html',
  styleUrls: ['./projects.page.scss'],
  animations: [
    fadeInOnEnterAnimation({duration: 1500, delay: 1500})
  ]
})
export class ProjectsPage implements AfterViewInit {
  projects = projects;

  @ViewChildren('project', { read: ElementRef })
  project!: QueryList<ElementRef<HTMLButtonElement>>;

  ngAfterViewInit(): void {
    console.log(this.project)
  }
}
