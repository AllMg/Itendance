import { TestBed, inject } from '@angular/core/testing';

import { DemandeReversionService } from './demande-reversion.service';

describe('DemandeReversionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DemandeReversionService]
    });
  });

  it('should be created', inject([DemandeReversionService], (service: DemandeReversionService) => {
    expect(service).toBeTruthy();
  }));
});
