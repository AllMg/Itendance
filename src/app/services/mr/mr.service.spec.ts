import { TestBed, inject } from '@angular/core/testing';

import { MrService } from './mr.service';

describe('MrService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MrService]
    });
  });

  it('should be created', inject([MrService], (service: MrService) => {
    expect(service).toBeTruthy();
  }));
});
