import { TestBed, inject } from '@angular/core/testing';

import { IjService } from './ij.service';

describe('IjService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IjService]
    });
  });

  it('should be created', inject([IjService], (service: IjService) => {
    expect(service).toBeTruthy();
  }));
});
