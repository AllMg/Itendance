import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraitementFpComponent } from './traitement-fp.component';

describe('TraitementFpComponent', () => {
  let component: TraitementFpComponent;
  let fixture: ComponentFixture<TraitementFpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraitementFpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraitementFpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
