import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeRecrutementComponent } from './demande-recrutement.component';

describe('DemandeRecrutementComponent', () => {
  let component: DemandeRecrutementComponent;
  let fixture: ComponentFixture<DemandeRecrutementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandeRecrutementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeRecrutementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
