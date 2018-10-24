import { TestBed, inject } from '@angular/core/testing';

import { CompteTService } from './compte-t.service';

describe('CompteTService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompteTService]
    });
  });

  it('should be created', inject([CompteTService], (service: CompteTService) => {
    expect(service).toBeTruthy();
  }));
});
