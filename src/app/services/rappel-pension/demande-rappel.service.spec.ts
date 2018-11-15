import { TestBed, inject } from '@angular/core/testing';

import { DemandeRappelService } from './demande-rappel.service';

describe('DemandeRappelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DemandeRappelService]
    });
  });

  it('should be created', inject([DemandeRappelService], (service: DemandeRappelService) => {
    expect(service).toBeTruthy();
  }));
});
