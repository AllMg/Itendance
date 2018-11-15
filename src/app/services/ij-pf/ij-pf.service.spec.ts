import { TestBed, inject } from '@angular/core/testing';

import { IjPfService } from './ij-pf.service';

describe('IjPfService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IjPfService]
    });
  });

  it('should be created', inject([IjPfService], (service: IjPfService) => {
    expect(service).toBeTruthy();
  }));
});
