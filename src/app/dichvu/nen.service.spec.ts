import { TestBed } from '@angular/core/testing';

import { NenService } from './nen.service';

describe('NenService', () => {
  let service: NenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
