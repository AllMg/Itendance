import { TestBed, inject } from '@angular/core/testing';

import { IndividuService } from './individu.service';

describe('IndividuService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IndividuService]
    });
  });

  it('should be created', inject([IndividuService], (service: IndividuService) => {
    expect(service).toBeTruthy();
  }));
});
