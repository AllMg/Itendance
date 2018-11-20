import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeRetraiteComponent } from './demande-retraite.component';

describe('DemandeRetraiteComponent', () => {
  let component: DemandeRetraiteComponent;
  let fixture: ComponentFixture<DemandeRetraiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandeRetraiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeRetraiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
