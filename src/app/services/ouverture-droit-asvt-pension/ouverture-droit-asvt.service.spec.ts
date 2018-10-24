import { TestBed, inject } from '@angular/core/testing';

import { OuvertureDroitAsvtService } from './ouverture-droit-asvt.service';

describe('OuvertureDroitAsvtService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OuvertureDroitAsvtService]
    });
  });

  it('should be created', inject([OuvertureDroitAsvtService], (service: OuvertureDroitAsvtService) => {
    expect(service).toBeTruthy();
  }));
});
