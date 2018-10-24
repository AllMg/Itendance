import { TestBed, inject } from '@angular/core/testing';

import { DemandeAtmpService } from './demande-atmp.service';

describe('DemandeAtmpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DemandeAtmpService]
    });
  });

  it('should be created', inject([DemandeAtmpService], (service: DemandeAtmpService) => {
    expect(service).toBeTruthy();
  }));
});
