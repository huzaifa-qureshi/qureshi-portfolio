import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild, effect } from '@angular/core';
import { BreakpointService } from 'src/app/services/breakpoint.service';
import { ModeService } from 'src/app/services/mode.service';

//tutorial followed for this game: https://www.youtube.com/watch?v=H9CSWMxJx84

const FPS = 30;
const FRICTION = 0.6;
const SHIPSIZE = 30;
const SHIPTHRUST = 5;
const SHIPROTSPD = 360;
const SHIPEXPLODETIME = 0.3;
const LASERSPD = 500;
const AESTROIDNUM = 14;
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
  //controls for mobile
  @ViewChild('leftButton') leftButton: ElementRef<any> | undefined;
  @ViewChild('rightButton') rightButton: ElementRef<any> | undefined;

  aestroids: any[] = [];
  ship: any;

  left:number = 0;
  top:number = 0;
  rotation:any;

  isdarkmode: boolean = false;
  tertiaryColor = this.isdarkmode? '#222222' : '#eeeeee';
  borderColor = this.isdarkmode? '#eeeeee' : '#666666';

  private lasersInterval : any;
  private spaceInterval : any;

  constructor(private modeService: ModeService, public breakpoint: BreakpointService) {
    effect(() => {
      this.isdarkmode = this.modeService.isdarkmode();
      this.tertiaryColor = this.isdarkmode? '#222222' : '#eeeeee';
      this.borderColor = this.isdarkmode? '#eeeeee' : '#222222';
    });
  }
  ngOnInit(): void {
    this.initShip();
    this.initAestroids();
  }

  ngAfterViewInit() {
    //Restricting touch to controls only
    if (this.breakpoint.isSmall) {
      if (this.leftButton && this.leftButton.nativeElement) {
        this.leftButton.nativeElement.addEventListener('touchstart', this.moveLeft.bind(this));
        this.leftButton.nativeElement.addEventListener('touchend', this.onTouchEnd.bind(this));
      }
      if (this.rightButton && this.rightButton.nativeElement) {
        this.rightButton.nativeElement.addEventListener('touchstart', this.moveRight.bind(this));
        this.rightButton.nativeElement.addEventListener('touchend', this.onTouchEnd.bind(this));
      }
    }

    const canvas = this.canvas.nativeElement;
    const context = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    this.lasersInterval = setInterval(() => {
      this.shootLasers();
    }, 400);

    this.spaceInterval = setInterval(() => {
      if (context) {
        //variable to check if ship is exploding or not
        var exploding = this.ship.explodeTime > 0;

        //create background
        context.fillStyle = this.tertiaryColor;
        context.fillRect(0, 0, canvas.width, canvas.height);

        //thrust the ship
        if(!exploding){
          if (this.ship.thrusting){
            this.ship.thrust.x += SHIPTHRUST * Math.cos(this.ship.angle) / FPS;
            this.ship.thrust.y -= SHIPTHRUST * Math.sin(this.ship.angle) / FPS;
            //draw the thruster
            context.fillStyle = "red";
            context.strokeStyle = this.tertiaryColor;
            context.lineWidth = SHIPSIZE / 10;

            context.beginPath();
            context.moveTo( //rear left
              this.ship.x - this.ship.radius * (2 / 3 * Math.cos(this.ship.angle) * 0.5 + Math.sin(this.ship.angle)),
              this.ship.y + this.ship.radius * (2 / 3 * Math.sin(this.ship.angle) * 0.5 - Math.cos(this.ship.angle)),
            );
            context.lineTo( //rear center (behind the ship)
              this.ship.x - this.ship.radius * 4 / 3 * Math.cos(this.ship.angle),
              this.ship.y + this.ship.radius * 4 / 3 * Math.sin(this.ship.angle),
            );
            context.lineTo( //rear right
              this.ship.x - this.ship.radius * (2 / 3 * Math.cos(this.ship.angle) * 0.5 - Math.sin(this.ship.angle)),
              this.ship.y + this.ship.radius * (2 / 3 * Math.sin(this.ship.angle) * 0.5 + Math.cos(this.ship.angle)),
            );
            context.closePath();
            context.fill();
            context.stroke();

          } else {
            this.ship.thrust.x -= FRICTION * (this.ship.thrust.x / FPS);
            this.ship.thrust.y -= FRICTION * (this.ship.thrust.y / FPS);
          }
        }

        //draw spaceship
        if (!exploding){
          context.strokeStyle = this.borderColor;
          context.lineWidth = SHIPSIZE / 20;

          context.beginPath();
          context.moveTo( //nose of the ship
            this.ship.x + 4 / 3 * this.ship.radius * Math.cos(this.ship.angle),
            this.ship.y - 4 / 3 * this.ship.radius * Math.sin(this.ship.angle),
          );
          context.lineTo( //rear left
            this.ship.x - this.ship.radius * (2 / 3 * Math.cos(this.ship.angle) + Math.sin(this.ship.angle)),
            this.ship.y + this.ship.radius * (2 / 3 * Math.sin(this.ship.angle) - Math.cos(this.ship.angle)),
          );
          context.lineTo( //rear right
            this.ship.x - this.ship.radius * (2 / 3 * Math.cos(this.ship.angle) - Math.sin(this.ship.angle)),
            this.ship.y + this.ship.radius * (2 / 3 * Math.sin(this.ship.angle) + Math.cos(this.ship.angle)),
          );
          context.closePath();
          //fill color in triangle
          context.fillStyle = this.borderColor;
          context.fill();
        }
        else{
          //draw the explosion
          context.fillStyle = 'red';
          context.beginPath();
          context.arc(this.ship.x, this.ship.y, this.ship.radius * 1.5, 0, Math.PI * 2, false);
          context.fill();
          
        }
        //rotate ship
        this.ship.angle += this.ship.rotation;

        //move the ship
        this.ship.x += this.ship.thrust.x;
        this.ship.y += this.ship.thrust.y;

        //handle edge of screen
        if (this.ship.x > canvas.width + this.ship.radius){
          this.ship.x = -this.ship.radius;
        } else if (this.ship.x < -this.ship.radius){
          this.ship.x = canvas.width + this.ship.radius;
        }
        if (this.ship.y > canvas.height + this.ship.radius){
          this.ship.y = -this.ship.radius;
        }
        else if (this.ship.y < -this.ship.radius){
          this.ship.y = canvas.height + this.ship.radius;
        }
        //check for ship collision
        if(!exploding){
          for (var i = 0 ; i < this.aestroids.length; i++){
            if(this.distBetweenAestroids(this.ship.x, this.ship.y, this.aestroids[i].x, this.aestroids[i].y) < this.ship.radius + this.aestroids[i].size){
              this.destroyship();
            }
          }
        }
        else{
          this.ship.explodeTime--;
          if(this.ship.explodeTime == 0){
            this.ship = {
              x : window.innerWidth / 2.5,
              y : window.innerHeight / 2,
              radius : SHIPSIZE / 2,
              angle : 90 / 180 * Math.PI,
              lasers : [],
              explodeTime : 0,
              rotation : 0,
              thrusting : false,
              thrust : {
                x : 0,
                y : 0,
              },
            }
          }
        }

        //draw the lasers
        for (var i = 0; i < this.ship.lasers.length; i++){
          context.fillStyle = this.borderColor;
          context.beginPath();
          context.arc(this.ship.lasers[i].x, this.ship.lasers[i].y, SHIPSIZE / 15, 0, Math.PI * 2, false);
          context.fill();
        }

        //move the lasers
        for (var i = 0; i < this.ship.lasers.length; i++){
          //destroy laser after it moves off screen
          if (this.ship.lasers[i].x > canvas.width || this.ship.lasers[i].x < 0 || this.ship.lasers[i].y > canvas.height || this.ship.lasers[i].y < 0){
            this.ship.lasers.splice(i, 1);
            continue;
          }
          this.ship.lasers[i].x += this.ship.lasers[i].xv;
          this.ship.lasers[i].y += this.ship.lasers[i].yv;
        }

        //detect laser collision with aestroids
        var ax, ay, ar, lx, ly;
        for (var i = this.aestroids.length - 1; i >= 0; i--){
          //grab the aestroid properties
          ax = this.aestroids[i].x;
          ay = this.aestroids[i].y;
          ar = this.aestroids[i].size;
          //for each laser
          for (var j = this.ship.lasers.length - 1; j >= 0; j--){
            //get lasers properties
            lx = this.ship.lasers[j].x;
            ly = this.ship.lasers[j].y;
            if (this.distBetweenAestroids(ax, ay, lx, ly) < ar){
              //remove the aestroid and laser
              this.destroyAestroid(i);
              this.ship.lasers.splice(j, 1);
              break;
            }
          }
        }

        //create aestroids
        context.strokeStyle = this.borderColor;
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

          //draw a path (shape of aestroids)
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

  @HostListener('document:mousemove', ['$event'])
  onMouseMove($event: { pageY: number; pageX: number; }) {
    const xDiff = $event.pageX - this.left;
    const yDiff = $event.pageY - this.top;
    const angle = Math.atan2(yDiff, xDiff) * (180 / Math.PI);

    this.top = $event.pageY;
    this.left = $event.pageX;
    // this.rotation = angle;
  }


  @HostListener('document:keydown', ['$event']) onKeyDown(event: KeyboardEvent) { 
    switch(event.key){
      case 'ArrowUp':
        this.ship.thrusting = true;
        break;
      case 'ArrowLeft':
        this.ship.rotation = SHIPROTSPD / 180 * Math.PI / FPS;
        break;
      case 'ArrowRight':
        this.ship.rotation = -SHIPROTSPD / 180 * Math.PI / FPS;
        break;
      case 'w':
        this.ship.thrusting = true;
        break;
      case 'a':
        this.ship.rotation = SHIPROTSPD / 180 * Math.PI / FPS;
        break;
      case 'd':
        this.ship.rotation = -SHIPROTSPD / 180 * Math.PI / FPS;
        break;
    }
  }


  @HostListener('document:keyup', ['$event']) onKeyUp(event: KeyboardEvent) {
    switch(event.key){
      case 'ArrowUp':
        this.ship.thrusting = false;
        break;
      case 'ArrowLeft':
        this.ship.rotation = 0;
        break;
      case 'ArrowRight':
        this.ship.rotation = 0;
        break;
      case 'w':
        this.ship.thrusting = false;
        break;
      case 'a':
        this.ship.rotation = 0;
        break;
      case 'd':
        this.ship.rotation = 0;
        break;
    }
  }


  initShip(){
    this.ship = {
      x : window.innerWidth / 2.5,
      y : window.innerHeight / 2,
      radius : SHIPSIZE / 2,
      angle : 90 / 180 * Math.PI,
      lasers : [],
      explodeTime : 0,
      rotation : 0,
      thrusting : false,
      thrust : {
        x : 0,
        y : 0,
      },
    }
  }

  initAestroids(){
    this.aestroids = [];
    for (var i = 0; i < AESTROIDNUM; i++) {
      //while to generate aestroids away from the center of the screen
      do{
        var x = Math.floor(Math.random() * window.innerWidth);
        var y = Math.floor(Math.random() * window.innerHeight);
      }
      while(this.distBetweenAestroids(window.innerWidth / 3, window.innerHeight / 2, x , y) < AESTROIDSIZE * 2 + 40);
      this.aestroids.push(this.initEachAestroid(x, y, Math.ceil(AESTROIDSIZE / 2)))
    }
  }

  initEachAestroid(x: number , y: number, s: number){
    var aestroid: { x: number, y: number, xvel: any, yvel: any, size: any, angle: any, vert: any, offset: number[] } = {
      x : x,
      y : y,
      xvel: Math.random() * AESTROIDSPD / FPS * (Math.random() < 0.5 ? 1 : -1),
      yvel: Math.random() * AESTROIDSPD / FPS * (Math.random() < 0.5 ? 1 : -1),
      size: s,
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

  destroyAestroid(index: number){
    //get aestroids properties
    var x = this.aestroids[index].x;
    var y = this.aestroids[index].y;
    var r = this.aestroids[index].size;

    //split the aestroid in two if large
    if(r == Math.ceil(AESTROIDSIZE / 2)){
      this.aestroids.push(this.initEachAestroid(x, y, Math.ceil(AESTROIDSIZE / 4)));
      this.aestroids.push(this.initEachAestroid(x, y, Math.ceil(AESTROIDSIZE / 4)));
    }
    else if (r == Math.ceil(AESTROIDSIZE / 4)){
      this.aestroids.push(this.initEachAestroid(x, y, Math.ceil(AESTROIDSIZE / 8)));
      this.aestroids.push(this.initEachAestroid(x, y, Math.ceil(AESTROIDSIZE / 8)));
    }

    //destroy the aestroid
    this.aestroids.splice(index, 1);
  }

  //get the distance between two points
  distBetweenAestroids(x1: number, y1: number, x2: number, y2: number){
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }

  shootLasers(){
    this.ship.lasers.push({ //add the laser to the array
      x : this.ship.x + 4 / 3 * this.ship.radius * Math.cos(this.ship.angle), 
      y : this.ship.y - 4 / 3 * this.ship.radius * Math.sin(this.ship.angle),
      xv : LASERSPD * Math.cos(this.ship.angle) / FPS,
      yv : -LASERSPD * Math.sin(this.ship.angle) / FPS,
    });
  }

  destroyship(){
    this.ship.explodeTime = Math.ceil(SHIPEXPLODETIME * FPS); 
    this.ship.thrust.x = 0;
    this.ship.thrust.y = 0;
    this.ship.rotation = 0;
  }

  //For Mobile
  onTouchEnd(event: TouchEvent) {
    event.preventDefault();
    this.stopmoving();
  }

  moveRight(){
    this.ship.thrusting = true;
    this.ship.rotation = -SHIPROTSPD / 180 * Math.PI / FPS;
  }

  moveLeft(){
    this.ship.thrusting = true;
    this.ship.rotation = SHIPROTSPD / 180 * Math.PI / FPS;
  }

  stopmoving(){
    this.ship.rotation = 0;
    this.ship.thrusting = false;
  }

  ngOnDestroy() {
    clearInterval(this.lasersInterval);
    clearInterval(this.spaceInterval);
    if (this.leftButton && this.leftButton.nativeElement) {
      this.leftButton.nativeElement.removeEventListener('touchstart', this.moveLeft.bind(this));
      this.leftButton.nativeElement.removeEventListener('touchend', this.onTouchEnd.bind(this));
    }
    if (this.rightButton && this.rightButton.nativeElement) {
      this.rightButton.nativeElement.removeEventListener('touchstart', this.moveRight.bind(this));
      this.rightButton.nativeElement.removeEventListener('touchend', this.onTouchEnd.bind(this));
    }
    this.ship = null;
    this.aestroids = [];
  }
}
