import { TestBed, inject } from '@angular/core/testing';

import { BasemodelService } from './basemodel.service';

describe('BasemodelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BasemodelService]
    });
  });

  it('should be created', inject([BasemodelService], (service: BasemodelService) => {
    expect(service).toBeTruthy();
  }));
});
