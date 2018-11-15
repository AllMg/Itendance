import { TestBed, inject } from '@angular/core/testing';

import { BanqueService } from './banque.service';

describe('BanqueService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BanqueService]
    });
  });

  it('should be created', inject([BanqueService], (service: BanqueService) => {
    expect(service).toBeTruthy();
  }));
});
