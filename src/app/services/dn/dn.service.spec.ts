import { TestBed, inject } from '@angular/core/testing';

import { DnService } from './dn.service';

describe('DnService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DnService]
    });
  });

  it('should be created', inject([DnService], (service: DnService) => {
    expect(service).toBeTruthy();
  }));
});
