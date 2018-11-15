import { TestBed, inject } from '@angular/core/testing';

import { SoldeService } from './solde.service';

describe('SoldeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SoldeService]
    });
  });

  it('should be created', inject([SoldeService], (service: SoldeService) => {
    expect(service).toBeTruthy();
  }));
});
