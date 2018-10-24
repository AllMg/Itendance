import { TestBed, inject } from '@angular/core/testing';

import { CompteEService } from './compte-e.service';

describe('CompteEService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompteEService]
    });
  });

  it('should be created', inject([CompteEService], (service: CompteEService) => {
    expect(service).toBeTruthy();
  }));
});
