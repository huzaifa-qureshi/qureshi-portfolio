import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceshipComponent } from './spaceship.component';

describe('SpaceshipComponent', () => {
  let component: SpaceshipComponent;
  let fixture: ComponentFixture<SpaceshipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpaceshipComponent]
    });
    fixture = TestBed.createComponent(SpaceshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
