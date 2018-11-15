import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HitoriqueSalaireAnneeComponent } from './hitorique-salaire-annee.component';

describe('HitoriqueSalaireAnneeComponent', () => {
  let component: HitoriqueSalaireAnneeComponent;
  let fixture: ComponentFixture<HitoriqueSalaireAnneeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HitoriqueSalaireAnneeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HitoriqueSalaireAnneeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
