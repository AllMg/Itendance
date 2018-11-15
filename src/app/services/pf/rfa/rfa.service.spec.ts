import { TestBed, inject } from '@angular/core/testing';

import { RfaService } from './rfa.service';

describe('RfaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RfaService]
    });
  });

  it('should be created', inject([RfaService], (service: RfaService) => {
    expect(service).toBeTruthy();
  }));
});
