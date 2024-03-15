import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoveringTooltipComponent } from './hovering-tooltip.component';

describe('HoveringTooltipComponent', () => {
  let component: HoveringTooltipComponent;
  let fixture: ComponentFixture<HoveringTooltipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HoveringTooltipComponent]
    });
    fixture = TestBed.createComponent(HoveringTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
