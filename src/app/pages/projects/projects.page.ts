import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { BreakpointService } from 'src/app/services/breakpoint.service';
import { CursorService } from 'src/app/services/cursor.service';

const projects =[
  {
    name : 'Blueprint Project Management System',
    githubLink : '',
    projectLink: 'https://love-doner.vercel.app/main',
    caption: 'Design and Development | Client | 2025',
    image : './assets/Images/p8-i1.png',
  },
  {
    name : 'Loverdoner POS & KMS System',
    githubLink : '',
    projectLink: 'https://blueprint-frontend-seven.vercel.app/',
    caption: 'Design and Development | Client | 2024',
    image : './assets/Images/p7-i1.png',
  },
  {
    name : 'Mecanize App',
    githubLink : '',
    projectLink: 'https://mecanize.vercel.app/',
    caption: 'Development | Client | 2024',
    image : '',
  },
  {
    name : 'ScholarLink Scholarship Portal',
    githubLink : '',
    projectLink: 'https://scholarship-portal-e69c1.web.app/#/home',
    caption: 'Design and Development | 2023',
    image : './assets/Images/p2-i1.png',
  }, 
  {
    name : 'Daily FrontEnd',
    githubLink : '',
    projectLink: 'https://dailyfrontend.dev/',
    caption: 'Design and Development | 2023',
    image : './assets/Images/p1-i1.png',
  },
  {
    name : 'Debate Society Website',
    githubLink : 'https://github.com/huzaifa-qureshi/NED-Debate-Society-Site.git',
    projectLink: 'https://ned-debate-society.vercel.app',
    caption: 'Design and Development | 2023',
    image : './assets/Images/p3-i1.png',
  },
  {
    name : 'Merchant Customer Payment Portal',
    githubLink : 'https://github.com/Shees-Ali/Procom24-Webdev.git',
    projectLink: 'https://procom24-webdev-five.vercel.app/#/customer',
    caption: 'Design and Development | Hackathon | 2024',
    image : './assets/Images/p4-i1.png',
  },
  {
    name : 'Report Generator for QA ',
    githubLink : 'https://github.com/huzaifa-qureshi/report-generator',
    projectLink: 'https://report-generator-seven.vercel.app/main',
    caption: 'Development | 2023',
    image : './assets/Images/p9 -i1.jpg',
  },
  {
    name : 'Django Final Project',
    githubLink : 'https://github.com/huzaifa-qureshi/agfzb-CloudAppDevelopment_Capstone',
    projectLink: '',
    caption: 'Development | 2023',
    image : './assets/Images/p5-i1.jpg',
  },
  {
    name : 'ESP32 Bluetooth App',
    githubLink : 'https://github.com/huzaifa-qureshi/ESP32-BLE',
    projectLink: 'https://twisty-cowbell-dea.notion.site/ESP32-Bluetooth-App-157aafea1fb64dc4a90a6fb6c9ec13f9',
    caption: 'Development | 2023',
    image : './assets/Images/p6-i1.jpg',
  },
]

@Component({
  selector: 'app-projects',
  templateUrl: './projects.page.html',
  styleUrls: ['./projects.page.scss'],
})
export class ProjectsPage{
  hoverimage = '';
  showToolTip:boolean = false;
  projects = projects;

  constructor(private cursorService: CursorService, public breakpoint: BreakpointService) {}
  
  onLinkHover(index?:any) {
    this.cursorService.expandCursor(true);
    if(index >= 0){
      this.showImage(index);  
    }
  }

  onLinkLeave() {
    this.cursorService.expandCursor(false);
    this.hideImage();
  }

  showImage(index : any){
    if(projects[index].image != ''){
      this.hoverimage = projects[index].image;
      this.showToolTip = true;
    }
  }

  hideImage(){
    this.showToolTip = false;
  }
}
