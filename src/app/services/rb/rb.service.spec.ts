import { TestBed, inject } from '@angular/core/testing';

import { RbService } from './rb.service';

describe('RbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RbService]
    });
  });

  it('should be created', inject([RbService], (service: RbService) => {
    expect(service).toBeTruthy();
  }));
});
