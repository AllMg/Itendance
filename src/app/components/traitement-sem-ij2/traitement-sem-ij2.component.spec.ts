import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraitementSemIj2Component } from './traitement-sem-ij2.component';

describe('TraitementSemIj2Component', () => {
  let component: TraitementSemIj2Component;
  let fixture: ComponentFixture<TraitementSemIj2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraitementSemIj2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraitementSemIj2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
