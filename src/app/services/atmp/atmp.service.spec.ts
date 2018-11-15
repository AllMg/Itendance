import { TestBed, inject } from '@angular/core/testing';

import { AtmpService } from './atmp.service';

describe('AtmpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AtmpService]
    });
  });

  it('should be created', inject([AtmpService], (service: AtmpService) => {
    expect(service).toBeTruthy();
  }));
});
