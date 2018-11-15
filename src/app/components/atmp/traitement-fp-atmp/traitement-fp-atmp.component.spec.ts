import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraitementFpAtmpComponent } from './traitement-fp-atmp.component';

describe('TraitementFpAtmpComponent', () => {
  let component: TraitementFpAtmpComponent;
  let fixture: ComponentFixture<TraitementFpAtmpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraitementFpAtmpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraitementFpAtmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
