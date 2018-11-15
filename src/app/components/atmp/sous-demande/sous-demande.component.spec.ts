import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SousDemandeComponent } from './sous-demande.component';

describe('SousDemandeComponent', () => {
  let component: SousDemandeComponent;
  let fixture: ComponentFixture<SousDemandeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SousDemandeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SousDemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
