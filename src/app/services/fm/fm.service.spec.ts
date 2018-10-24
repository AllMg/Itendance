import { TestBed, inject } from '@angular/core/testing';

import { FmService } from './fm.service';

describe('FmService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FmService]
    });
  });

  it('should be created', inject([FmService], (service: FmService) => {
    expect(service).toBeTruthy();
  }));
});
