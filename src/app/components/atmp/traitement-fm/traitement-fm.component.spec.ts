import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraitementFmComponent } from './traitement-fm.component';

describe('TraitementFmComponent', () => {
  let component: TraitementFmComponent;
  let fixture: ComponentFixture<TraitementFmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraitementFmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraitementFmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
