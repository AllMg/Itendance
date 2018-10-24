import { TestBed, inject } from '@angular/core/testing';

import { OpService } from './op.service';

describe('OpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OpService]
    });
  });

  it('should be created', inject([OpService], (service: OpService) => {
    expect(service).toBeTruthy();
  }));
});
