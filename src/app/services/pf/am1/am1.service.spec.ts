import { TestBed, inject } from '@angular/core/testing';

import { Am1Service } from './am1.service';

describe('Am1Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Am1Service]
    });
  });

  it('should be created', inject([Am1Service], (service: Am1Service) => {
    expect(service).toBeTruthy();
  }));
});
