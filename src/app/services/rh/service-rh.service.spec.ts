import { TestBed, inject } from '@angular/core/testing';

import { ServiceRhService } from './service-rh.service';

describe('ServiceRhService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServiceRhService]
    });
  });

  it('should be created', inject([ServiceRhService], (service: ServiceRhService) => {
    expect(service).toBeTruthy();
  }));
});
