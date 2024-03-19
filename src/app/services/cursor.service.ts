import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursorService {
  private expandCursorSource = new Subject<boolean>();
  expandCursor$ = this.expandCursorSource.asObservable();

  expandCursor(value: boolean) {
    this.expandCursorSource.next(value);
  }
}
