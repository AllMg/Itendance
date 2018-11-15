import { TestBed, inject } from '@angular/core/testing';

import { PenService } from './pen.service';

describe('PenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PenService]
    });
  });

  it('should be created', inject([PenService], (service: PenService) => {
    expect(service).toBeTruthy();
  }));
});
