import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemPaiementOrComponent } from './dem-paiement-or.component';

describe('DemPaiementOrComponent', () => {
  let component: DemPaiementOrComponent;
  let fixture: ComponentFixture<DemPaiementOrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemPaiementOrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemPaiementOrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
