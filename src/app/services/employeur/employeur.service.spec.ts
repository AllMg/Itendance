import { TestBed, inject } from '@angular/core/testing';

import { EmployeurService } from './employeur.service';

describe('EmployeurService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmployeurService]
    });
  });

  it('should be created', inject([EmployeurService], (service: EmployeurService) => {
    expect(service).toBeTruthy();
  }));
});
