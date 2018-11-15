import { TestBed, inject } from '@angular/core/testing';

import { DlprService } from './dlpr.service';

describe('DlprService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DlprService]
    });
  });

  it('should be created', inject([DlprService], (service: DlprService) => {
    expect(service).toBeTruthy();
  }));
});
