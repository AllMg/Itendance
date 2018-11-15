import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDemandeRfaComponent } from './liste-demande-rfa.component';

describe('ListeDemandeRfaComponent', () => {
  let component: ListeDemandeRfaComponent;
  let fixture: ComponentFixture<ListeDemandeRfaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeDemandeRfaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeDemandeRfaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
