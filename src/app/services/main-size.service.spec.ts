import { TestBed } from '@angular/core/testing';

import { MainSizeService } from './main-size.service';

describe('MainSizeService', () => {
  let service: MainSizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainSizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
