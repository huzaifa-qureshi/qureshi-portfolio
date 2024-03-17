import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

const FPS = 30;
const AESTROIDNUM = 10;
const AESTROIDSPD = 40;
const AESTROIDSIZE = 100;
const AESTROIDVERT = 10;
const AESTROIDJAG = 0.25;

@Component({
  selector: 'space',
  templateUrl: './space.component.html',
  styleUrls: ['./space.component.scss']
})
export class SpaceComponent implements OnInit, AfterViewInit {
  @ViewChild('space', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  aestroids: any[] = [];

  ngOnInit(): void {
    this.initAestroids();
  }

  ngAfterViewInit() {
    const canvas = this.canvas.nativeElement;
    const context = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    setInterval(() => {
      if (context) {
        context.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-tertiary');
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-border');
        context.lineWidth = 2;
        var x , y , r , a , vert, offs: number[];
        for (var i = 0 ; i < this.aestroids.length; i++) {
          //get properties of each aestroid
          x = this.aestroids[i].x;
          y = this.aestroids[i].y;
          r = this.aestroids[i].size;
          a = this.aestroids[i].angle;
          vert = this.aestroids[i].vert;
          offs = this.aestroids[i].offset;
          //draw a path
          context.beginPath();
          context.moveTo(
            x + r * offs[0] * Math.cos(a),
            y + r * offs[0] * Math.sin(a)
          );

          //draw the polygon
          context.lineJoin = 'round';
          context.lineCap = 'round';
          for (var j = 1; j < vert; j++){
            context.lineTo(
              x + r * offs[j] * Math.cos(a + j * Math.PI * 2 / vert),
              y + r * offs[j] * Math.sin(a + j * Math.PI * 2 / vert)
            );
          }
          context.closePath();
          context.stroke();

          //move the aestroid
          this.aestroids[i].x += this.aestroids[i].xvel;
          this.aestroids[i].y += this.aestroids[i].yvel;

          //handle edge of screen
          if (this.aestroids[i].x > canvas.width + r){
            this.aestroids[i].x = -r;
          } else if (this.aestroids[i].x < -r){
            this.aestroids[i].x = canvas.width + r;
          }
          if (this.aestroids[i].y > canvas.height + r){
            this.aestroids[i].y = -r;
          }
          else if (this.aestroids[i].y < -r){
            this.aestroids[i].y = canvas.height + r;
          }
        }
      }
    }, 1000 / FPS);

  }

  initAestroids(){
    this.aestroids = [];
    for (var i = 0; i < AESTROIDNUM; i++) {
      do{
        var x = Math.floor(Math.random() * window.innerWidth);
        var y = Math.floor(Math.random() * window.innerHeight);
      }
      while(this.distBetweenAestroids(window.innerWidth / 3, window.innerHeight / 2, x , y) < AESTROIDSIZE * 2 + 40);
      this.aestroids.push(this.initEachAestroid(x, y))
    }
  }

  initEachAestroid(x: number , y: number){
    var aestroid: { x: number, y: number, xvel: any, yvel: any, size: any, angle: any, vert: any, offset: number[] } = {
      x : x,
      y : y,
      xvel: Math.random() * AESTROIDSPD / FPS * (Math.random() < 0.5 ? 1 : -1),
      yvel: Math.random() * AESTROIDSPD / FPS * (Math.random() < 0.5 ? 1 : -1),
      size: Math.random() * AESTROIDSIZE,
      angle: Math.random() * Math.PI * 2,
      vert: Math.floor(Math.random() * (AESTROIDVERT + 1) + AESTROIDVERT / 2 ),
      offset: [],
    }

    //creating the vertex offset array
    for (var i = 0; i < aestroid.vert; i++){
      aestroid.offset.push(Math.random() * AESTROIDJAG * 2 + 1 - AESTROIDJAG);
    }
    return aestroid;
  }

  distBetweenAestroids(x1: number, y1: number, x2: number, y2: number){
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }
}
