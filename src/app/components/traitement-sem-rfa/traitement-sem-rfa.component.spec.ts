import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraitementSemRfaComponent } from './traitement-sem-rfa.component';

describe('TraitementSemRfaComponent', () => {
  let component: TraitementSemRfaComponent;
  let fixture: ComponentFixture<TraitementSemRfaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraitementSemRfaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraitementSemRfaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
