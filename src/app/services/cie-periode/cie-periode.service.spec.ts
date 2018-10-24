import { TestBed, inject } from '@angular/core/testing';

import { CiePeriodeService } from './cie-periode.service';

describe('CiePeriodeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CiePeriodeService]
    });
  });

  it('should be created', inject([CiePeriodeService], (service: CiePeriodeService) => {
    expect(service).toBeTruthy();
  }));
});
