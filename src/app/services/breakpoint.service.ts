import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import { Injectable, Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BreakpointService {
  destroyed = new Subject<void>();
  isSmall!: boolean;

  displayNameMap = new Map([
    [Breakpoints.XSmall, true],
    [Breakpoints.Small, false],
    [Breakpoints.Medium, false],
    [Breakpoints.Large, false],
    [Breakpoints.XLarge, false],
  ]);

   constructor(breakpointObserver: BreakpointObserver) {
    breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .pipe(takeUntil(this.destroyed))
      .subscribe(result => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            this.isSmall = this.displayNameMap.get(query) ?? false;
          }
        }
      });
  }


  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
