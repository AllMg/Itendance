import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraitementFmAtmpComponent } from './traitement-fm-atmp.component';

describe('TraitementFmAtmpComponent', () => {
  let component: TraitementFmAtmpComponent;
  let fixture: ComponentFixture<TraitementFmAtmpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraitementFmAtmpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraitementFmAtmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
