import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeIjComponent } from './demande-ij.component';

describe('DemandeIjComponent', () => {
  let component: DemandeIjComponent;
  let fixture: ComponentFixture<DemandeIjComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandeIjComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeIjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
