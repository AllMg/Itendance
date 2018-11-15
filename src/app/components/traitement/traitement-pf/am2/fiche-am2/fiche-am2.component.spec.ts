import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheAm2Component } from './fiche-am2.component';

describe('FicheAm2Component', () => {
  let component: FicheAm2Component;
  let fixture: ComponentFixture<FicheAm2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FicheAm2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FicheAm2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
