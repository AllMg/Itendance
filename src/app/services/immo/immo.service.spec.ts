import { TestBed, inject } from '@angular/core/testing';

import { ImmoService } from './immo.service';

describe('ImmoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImmoService]
    });
  });

  it('should be created', inject([ImmoService], (service: ImmoService) => {
    expect(service).toBeTruthy();
  }));
});
