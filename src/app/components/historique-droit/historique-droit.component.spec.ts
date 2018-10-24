import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueDroitComponent } from './historique-droit.component';

describe('HistoriqueDroitComponent', () => {
  let component: HistoriqueDroitComponent;
  let fixture: ComponentFixture<HistoriqueDroitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoriqueDroitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriqueDroitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
