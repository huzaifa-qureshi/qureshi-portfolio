import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HamburgerMenuComponent } from './hamburger-menu/hamburger-menu.component';
import { NavComponent } from './nav/nav.component';
import { CursorComponent } from './cursor/cursor.component';
import { RouterModule } from '@angular/router';
import { BgModelComponent } from './bg-model/bg-model.component';
import { ModeSwitchComponent } from './mode-switch/mode-switch.component';
import { NextSlideBtnComponent } from './next-slide-btn/next-slide-btn.component';
import { NgIconsModule } from '@ng-icons/core';
import { ionArrowDownCircleOutline} from '@ng-icons/ionicons';
import { LoaderComponent } from './loader/loader.component';
import { HoveringTooltipComponent } from './hovering-tooltip/hovering-tooltip.component';
import { SpaceshipComponent } from './spaceship/spaceship.component';
import { SpaceComponent } from './space/space.component';

@NgModule({
  declarations: [
    HamburgerMenuComponent,
    NavComponent,
    CursorComponent,
    BgModelComponent,
    ModeSwitchComponent,
    NextSlideBtnComponent,
    LoaderComponent,
    HoveringTooltipComponent,
    SpaceshipComponent,
    SpaceComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgIconsModule.withIcons({ionArrowDownCircleOutline})
  ],
  exports: [
    HamburgerMenuComponent,
    NavComponent,
    CursorComponent,
    BgModelComponent,
    ModeSwitchComponent,
    NextSlideBtnComponent,
    LoaderComponent,
    HoveringTooltipComponent,
    SpaceshipComponent,
    SpaceComponent,
  ],
})
export class ComponentsModule { }
