import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, AfterViewInit {
  @ViewChild('loaderContainer', { static: true }) loaderContainer!: ElementRef;
  @ViewChild('numberDisplay', { static: true }) numberDisplay!: ElementRef;
  @ViewChild('textContent', { static: true }) textContent!: ElementRef;

  currentNumber: number = 0;
  ngOnInit() {
    this.startCountdown();
  }
  ngAfterViewInit() {
    // Set initial states
    gsap.set(this.textContent.nativeElement, { opacity: 0, y: 20 });
    gsap.set(this.numberDisplay.nativeElement, { opacity: 0, scale: 0.8 });
    
    // Create timeline for entrance animations
    const tl = gsap.timeline();
    
    // Animate number display in
    tl.to(this.numberDisplay.nativeElement, {
      opacity: 0.1,
      scale: 1,
      duration: 0.6,
      ease: "back.out(1.7)"
    })
    // Animate text in
    .to(this.textContent.nativeElement, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out"
    }, "-=0.3");
  }

  startCountdown() {
    // Animate the number countdown using GSAP with easing for more natural feel
    gsap.to(this, {
      currentNumber: 100,
      duration: 4,
      ease: "power2.out",
      onUpdate: () => {
        // Add subtle scale animation during countdown
        gsap.to(this.numberDisplay.nativeElement, {
          scale: 1.05,
          duration: 0.1,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut"
        });
      },
      onComplete: () => {
        // Create exit timeline
        const exitTl = gsap.timeline();
        
        // Fade out text first
        exitTl.to(this.textContent.nativeElement, {
          opacity: 0,
          y: -20,
          duration: 0.3,
          ease: "power2.in"
        })
        // Scale out number
        .to(this.numberDisplay.nativeElement, {
          scale: 0,
          opacity: 0,
          duration: 0.4,
          ease: "back.in(1.7)"
        }, "-=0.1")
        // Slide up entire container
        .to(this.loaderContainer.nativeElement, {
          y: "-100%",
          duration: 0.8,
          ease: "power2.inOut"
        }, "-=0.2");
      }
    });
  }
}
