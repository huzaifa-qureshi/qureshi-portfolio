import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild, effect, OnDestroy, HostListener } from '@angular/core';
import { MainSizeService } from 'src/app/services/main-size.service';
import { ModeService } from 'src/app/services/mode.service';
import { Subscription } from 'rxjs';
import * as THREE from 'three';
// import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

@Component({
  selector: 'bg-model',
  templateUrl: './bg-model.component.html',
  styleUrls: ['./bg-model.component.scss']
})
export class BgModelComponent implements AfterViewInit, OnDestroy {
  @Input() isdarkmode: boolean = false;
  
  parentSize: any;
  backgroundColor = this.isdarkmode? 0x222222 : 0xeeeeee; 
  shapeColor = this.isdarkmode? 0xeeeeee : 0x666666;   private sizeSubscription?: Subscription;
  private isInitialized = false;
    // Mouse tracking properties
  private mouseX: number = 0;
  private mouseY: number = 0;
  private targetRotationX: number = 0;
  private targetRotationY: number = 0;
  private currentRotationX: number = 0;
  private currentRotationY: number = 0;
    // Inertia and default rotation properties
  private velocityX: number = 0;
  private velocityY: number = 0;
  private lastMouseMoveTime: number = 0;
  private isMouseMoving: boolean = false;
  private previousMouseX: number = 0;
  private previousMouseY: number = 0;

  @ViewChild('canvas')
  private canvasRef!: ElementRef;
  // Shape Properties
  @Input() public rotationSpeedX: number = 0.0025;
  @Input() public rotationSpeedY: number = 0.00125;
  @Input() public size: number = 8000;
  @Input() public mouseSensitivity: number = 0.5;
  @Input() public lerpFactor: number = 0.05;

  // Stage
  @Input() public cameraZ:number = 400;
  @Input() public fieldofView: number = 1;
  @Input('nearCliping') public nearClippingPlane: number = 0.1;
  @Input('farClipping') public farClippingPlane: number = 1000; 


  constructor(private screenSize: MainSizeService, private modeService: ModeService){
    effect(() => {
      this.isdarkmode = this.modeService.isdarkmode();
      this.backgroundColor = this.isdarkmode? 0x222222 : 0xeeeeee; 
      this.shapeColor = this.isdarkmode? 0xeeeeee : 0x666666; 
      this.material.color = new THREE.Color(this.shapeColor);
      this.scene.background = new THREE.Color(this.backgroundColor);
    });
  }

  // Helper Properties(private)
  private camera!: THREE.PerspectiveCamera;
  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }
  // private loader = new THREE.TextureLoader();
  private geometry = new THREE.IcosahedronGeometry(8, 5);
  private material = new THREE.MeshBasicMaterial({ color: this.shapeColor, wireframe: true});
  private shape: THREE.Mesh = new THREE.Mesh(this.geometry, this.material);
  private renderer !: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  // private control!: OrbitControls;  //Animate the shape 
  private animateshape() {
    const currentTime = Date.now();
    
    // Check if mouse stopped moving (no movement for 200ms)
    if (currentTime - this.lastMouseMoveTime > 200) {
      this.isMouseMoving = false;
    }
    
    if (this.isMouseMoving) {
      // Mouse is moving - follow mouse direction and calculate velocity
      
      // Calculate mouse movement delta for velocity
      const deltaX = this.mouseX - this.previousMouseX;
      const deltaY = this.mouseY - this.previousMouseY;
      
      // Update velocity based on mouse movement
      this.velocityX = deltaX * this.mouseSensitivity * 0.1;
      this.velocityY = deltaY * this.mouseSensitivity * 0.1;
      
      // Store current mouse position for next frame
      this.previousMouseX = this.mouseX;
      this.previousMouseY = this.mouseY;
      
      // Directly follow mouse position with smooth interpolation
      this.currentRotationX += (this.targetRotationX - this.currentRotationX) * this.lerpFactor;
      this.currentRotationY += (this.targetRotationY - this.currentRotationY) * this.lerpFactor;
    } else {
      // Mouse stopped - continue with inertia or default rotation
      
      if (Math.abs(this.velocityX) > 0.0001 || Math.abs(this.velocityY) > 0.0001) {
        // Apply inertia - continue moving in last direction
        this.currentRotationX += this.velocityX;
        this.currentRotationY += this.velocityY;
        
        // Gradually slow down the velocity (friction)
        this.velocityX *= 0.98;
        this.velocityY *= 0.98;
      } else {
        // When velocity is very low, use default rotation
        this.currentRotationX += this.rotationSpeedX;
        this.currentRotationY += this.rotationSpeedY;
      }
    }
    
    // Apply the rotation to the shape
    this.shape.rotation.x = this.currentRotationX;
    this.shape.rotation.y = this.currentRotationY;
  }

  //Creating the scene
  private createScene() { 
    //* Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(this.backgroundColor);
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
  }  private getAspectRatio() {
    // Use actual canvas dimensions for aspect ratio
    const canvasWidth = this.canvas.clientWidth || this.canvas.offsetWidth;
    const canvasHeight = this.canvas.clientHeight || this.canvas.offsetHeight;
    return canvasWidth > 0 && canvasHeight > 0 ? canvasWidth / canvasHeight : window.innerWidth / window.innerHeight;
  }  //Start Rendering 
  private startRenderingLoop() {
    //* Renderer
    // Use canvas element in template
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.renderer.setPixelRatio(devicePixelRatio);
    
    // Use actual canvas dimensions instead of service dimensions
    const canvasWidth = this.canvas.clientWidth || this.canvas.offsetWidth;
    const canvasHeight = this.canvas.clientHeight || this.canvas.offsetHeight;
    
    this.renderer.setSize(canvasWidth, canvasHeight);

    let component: BgModelComponent = this;
    (function render() {
      // component.control.update();
      requestAnimationFrame(render);
      component.animateshape();
      component.renderer.render(component.scene, component.camera);
    }());
  }
  ngAfterViewInit(){
    this.start();
  }

  start(){
    this.getScreenSize();
  }  
  
  getScreenSize(){
    this.sizeSubscription = this.screenSize.getSize.subscribe(size => {
      this.parentSize = size;
      
      // Only initialize the scene and start rendering when we have valid dimensions
      if (size.width > 0 && size.height > 0) {
        if (!this.isInitialized) {
          // Wait a bit for the canvas to be properly sized by CSS

          setTimeout(() => {
            this.createScene();
            this.startRenderingLoop();
            this.isInitialized = true;
          }, 0);
        } 
        else {
          // Update renderer size using actual canvas dimensions
          const canvasWidth = this.canvas.clientWidth || this.canvas.offsetWidth;
          const canvasHeight = this.canvas.clientHeight || this.canvas.offsetHeight;
          
          if (canvasWidth > 0 && canvasHeight > 0) {
            this.renderer.setSize(canvasWidth, canvasHeight);
            this.camera.aspect = canvasWidth / canvasHeight;
            this.camera.updateProjectionMatrix();
          }
        }
      }
    });
  }
  
  ngOnDestroy() {
    if (this.sizeSubscription) {
      this.sizeSubscription.unsubscribe();
    }
  }
  @HostListener('window:resize', ['$event'])
  onWindowResize(event: Event) {
    if (this.isInitialized && this.renderer && this.camera) {
      const canvasWidth = this.canvas.clientWidth || this.canvas.offsetWidth;
      const canvasHeight = this.canvas.clientHeight || this.canvas.offsetHeight;
      
      if (canvasWidth > 0 && canvasHeight > 0) {
        this.renderer.setSize(canvasWidth, canvasHeight);
        this.camera.aspect = canvasWidth / canvasHeight;
        this.camera.updateProjectionMatrix();
      }
    }
  }  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.isInitialized) {
      // Update mouse movement timing
      this.lastMouseMoveTime = Date.now();
      this.isMouseMoving = true;
      
      // Get window dimensions for consistent mouse tracking
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      // Normalize mouse position to -1 to 1 range
      this.mouseX = (event.clientX / windowWidth) * 2 - 1;
      this.mouseY = -(event.clientY / windowHeight) * 2 + 1;
      
      // Calculate target rotation based on mouse position
      this.targetRotationX = this.mouseY * this.mouseSensitivity;
      this.targetRotationY = this.mouseX * this.mouseSensitivity;
    }
  }
}
