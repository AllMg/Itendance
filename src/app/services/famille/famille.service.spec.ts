import { TestBed, inject } from '@angular/core/testing';

import { FamilleService } from './famille.service';

describe('FamilleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FamilleService]
    });
  });

  it('should be created', inject([FamilleService], (service: FamilleService) => {
    expect(service).toBeTruthy();
  }));
});
