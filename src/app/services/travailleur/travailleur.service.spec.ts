import { TestBed, inject } from '@angular/core/testing';

import { TravailleurService } from './travailleur.service';

describe('TravailleurService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TravailleurService]
    });
  });

  it('should be created', inject([TravailleurService], (service: TravailleurService) => {
    expect(service).toBeTruthy();
  }));
});
