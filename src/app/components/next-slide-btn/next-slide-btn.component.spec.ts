import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextSlideBtnComponent } from './next-slide-btn.component';

describe('NextSlideBtnComponent', () => {
  let component: NextSlideBtnComponent;
  let fixture: ComponentFixture<NextSlideBtnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NextSlideBtnComponent]
    });
    fixture = TestBed.createComponent(NextSlideBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
