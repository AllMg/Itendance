import { TestBed, inject } from '@angular/core/testing';

import { Am2Service } from './am2.service';

describe('Am2Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Am2Service]
    });
  });

  it('should be created', inject([Am2Service], (service: Am2Service) => {
    expect(service).toBeTruthy();
  }));
});
