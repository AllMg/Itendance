import { TestBed, inject } from '@angular/core/testing';

import { DemandePensionService } from './demande-pension.service';

describe('DemandePensionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DemandePensionService]
    });
  });

  it('should be created', inject([DemandePensionService], (service: DemandePensionService) => {
    expect(service).toBeTruthy();
  }));
});
