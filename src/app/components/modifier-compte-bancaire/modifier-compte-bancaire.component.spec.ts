import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierCompteBancaireComponent } from './modifier-compte-bancaire.component';

describe('ModifierCompteBancaireComponent', () => {
  let component: ModifierCompteBancaireComponent;
  let fixture: ComponentFixture<ModifierCompteBancaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierCompteBancaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierCompteBancaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
