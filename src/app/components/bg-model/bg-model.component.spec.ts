import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BgModelComponent } from './bg-model.component';

describe('BgModelComponent', () => {
  let component: BgModelComponent;
  let fixture: ComponentFixture<BgModelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BgModelComponent]
    });
    fixture = TestBed.createComponent(BgModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
