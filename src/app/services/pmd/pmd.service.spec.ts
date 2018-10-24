import { TestBed, inject } from '@angular/core/testing';

import { PmdService } from './pmd.service';

describe('PmdService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PmdService]
    });
  });

  it('should be created', inject([PmdService], (service: PmdService) => {
    expect(service).toBeTruthy();
  }));
});
