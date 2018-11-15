import { TestBed, inject } from '@angular/core/testing';

import { DemandeRevisionService } from './demande-revision.service';

describe('DemandeRevisionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DemandeRevisionService]
    });
  });

  it('should be created', inject([DemandeRevisionService], (service: DemandeRevisionService) => {
    expect(service).toBeTruthy();
  }));
});
