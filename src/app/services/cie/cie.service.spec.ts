import { TestBed, inject } from '@angular/core/testing';

import { CieService } from './cie.service';

describe('CieService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CieService]
    });
  });

  it('should be created', inject([CieService], (service: CieService) => {
    expect(service).toBeTruthy();
  }));
});
