import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MainSizeService } from 'src/app/services/main-size.service';
import * as THREE from 'three';
// import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

@Component({
  selector: 'bg-model',
  templateUrl: './bg-model.component.html',
  styleUrls: ['./bg-model.component.scss']
})
export class BgModelComponent implements OnInit, AfterViewInit {
  parentSize: any;

  @ViewChild('canvas')
  private canvasRef!: ElementRef;

  // Shape Properties
  @Input() public rotationSpeedX: number = 0.0050;
  @Input() public rotationSpeedY: number = 0.0025;
  @Input() public size: number = 8000;
  @Input() public texture: string = "/assets/texture.jpg";

  // Stage
  @Input() public cameraZ:number = 400;
  @Input() public fieldofView: number = 1;
  @Input('nearCliping') public nearClippingPlane: number = 0.1;
  @Input('farClipping') public farClippingPlane: number = 1000; 


  constructor(private screenSize: MainSizeService){}

  // Helper Properties(private)
  private camera!: THREE.PerspectiveCamera;
  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }
  // private loader = new THREE.TextureLoader();
  private geometry = new THREE.IcosahedronGeometry(8, 5);
  private material = new THREE.MeshBasicMaterial({color: 0x666666 , wireframe: true});
  private shape: THREE.Mesh = new THREE.Mesh(this.geometry, this.material);
  private renderer !: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  // private control!: OrbitControls;

  //Animate the shape 
  private animateshape() {
    this.shape.rotation.x += this.rotationSpeedX;
    this.shape.rotation.y += this.rotationSpeedY;
  }

  //Creating the scene
  private createScene() { 
    //* Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xeeeeee);
    this.scene.add(this.shape);
    //*Camera
    let aspectRatio = this.getAspectRatio();
    this.camera = new THREE.PerspectiveCamera(
      this.fieldofView,
      aspectRatio,
      this.nearClippingPlane,
      this.farClippingPlane
    )
    this.camera.position.z = this.cameraZ;
  }

  private getAspectRatio() {
    // return this.canvas.clientWidth / this.canvas.clientHeight;
    return window.innerWidth/ window.innerHeight;
  }

  //Start Rendering 
  private startRenderingLoop() {
    //* Renderer
    // Use canvas element in template
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.parentSize.width, this.parentSize.height);

    let component: BgModelComponent = this;
    (function render() {
      // component.control.update();
      requestAnimationFrame(render);
      component.animateshape();
      component.renderer.render(component.scene, component.camera);
    }());
  }

  ngOnInit(){
    
  }

  ngAfterViewInit(){
    this.getScreenSize();
    this.createScene();
    this.startRenderingLoop();
  }
  
  getScreenSize(){
    this.screenSize.getSize.subscribe(size => this.parentSize = size)
  }
}
