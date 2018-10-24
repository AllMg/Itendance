import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeAtComponent } from './demande-at.component';

describe('DemandeAtComponent', () => {
  let component: DemandeAtComponent;
  let fixture: ComponentFixture<DemandeAtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandeAtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeAtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
