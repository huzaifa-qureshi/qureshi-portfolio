import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { fadeInOnEnterAnimation } from 'angular-animations';

const projects =[
  {
    name : 'Daily FrontEnd',
    githubLink : 'https://github.com/Shees-Ali/daily-frontend',
    projectLink: 'https://dailyfrontend.dev/',
    caption: 'Design and Development | 2023',
  },
  {
    name : 'ScholarLink Scholarship Portal',
    githubLink : 'https://github.com/Shees-Ali/ned-scholarship-portal',
    projectLink: 'https://scholarship-portal-e69c1.web.app/#/home',
    caption: 'Design and Development | 2023',
  },
  {
    name : 'ESP32 Bluetooth App',
    githubLink : 'https://github.com/huzaifa-qureshi/ESP32-BLE',
    projectLink: '',
    caption: 'Development | 2023',
  },
  {
    name : 'Book Review App',
    githubLink : 'https://github.com/huzaifa-qureshi/expressBookReviews',
    projectLink: '',
    caption: 'Development | 2023',
  },
  {
    name : 'Django Final Project',
    githubLink : 'https://github.com/huzaifa-qureshi/agfzb-CloudAppDevelopment_Capstone',
    projectLink: '',
    caption: 'Development | 2023',
  },
  {
    name : 'Flask Project',
    githubLink : 'https://github.com/huzaifa-qureshi/xzceb-flask_eng_fr',
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
export class ProjectsPage{
  projects = projects;

  @ViewChildren('project', { read: ElementRef })
  project!: QueryList<ElementRef<HTMLButtonElement>>;

}
