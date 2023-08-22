import { Component } from '@angular/core';
import { fadeInOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.page.html',
  styleUrls: ['./projects.page.scss'],
  animations: [
    fadeInOnEnterAnimation({duration: 1500, delay: 1500})
  ]
})
export class ProjectsPage {
  projects =[
    {
      name : 'Daily FrontEnd',
      githubLink : '',
      projectLink: '',
    },
    {
      name : 'ScholarLink Scholarship Portal',
      githubLink : '',
      projectLink: '',
    },
    {
      name : 'ESP32 Bluetooth App',
      githubLink : '',
      projectLink: '',
    },
    {
      name : 'Book Review App',
      githubLink : '',
      projectLink: '',
    },
    {
      name : 'Django Final Project',
      githubLink : '',
      projectLink: '',
    },
    {
      name : 'Flask Project',
      githubLink : '',
      projectLink: '',
    },
    {
      name : 'Tech Tree',
      githubLink : '',
      projectLink: '',
    },
    {
      name : 'Book Review App',
      githubLink : '',
      projectLink: '',
    },
    {
      name : 'Django Final Project',
      githubLink : '',
      projectLink: '',
    },
    {
      name : 'Flask Project',
      githubLink : '',
      projectLink: '',
    },
    {
      name : 'Tech Tree',
      githubLink : '',
      projectLink: '',
    },
  ]
}
