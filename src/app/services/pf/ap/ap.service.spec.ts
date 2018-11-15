import { TestBed, inject } from '@angular/core/testing';

import { ApService } from './ap.service';

describe('ApService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApService]
    });
  });

  it('should be created', inject([ApService], (service: ApService) => {
    expect(service).toBeTruthy();
  }));
});
