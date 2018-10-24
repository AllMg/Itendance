import { TestBed, inject } from '@angular/core/testing';

import { Ij2Service } from './ij2.service';

describe('Ij2Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Ij2Service]
    });
  });

  it('should be created', inject([Ij2Service], (service: Ij2Service) => {
    expect(service).toBeTruthy();
  }));
});
