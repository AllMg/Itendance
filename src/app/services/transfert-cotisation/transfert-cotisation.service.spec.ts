import { TestBed, inject } from '@angular/core/testing';

import { TransfertCotisationService } from './transfert-cotisation.service';

describe('TransfertCotisationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransfertCotisationService]
    });
  });

  it('should be created', inject([TransfertCotisationService], (service: TransfertCotisationService) => {
    expect(service).toBeTruthy();
  }));
});
