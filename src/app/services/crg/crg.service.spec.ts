import { TestBed, inject } from '@angular/core/testing';

import { CrgService } from './crg.service';

describe('CrgService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CrgService]
    });
  });

  it('should be created', inject([CrgService], (service: CrgService) => {
    expect(service).toBeTruthy();
  }));
});
