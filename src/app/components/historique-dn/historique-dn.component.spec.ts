import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueDnComponent } from './historique-dn.component';

describe('HistoriqueDnComponent', () => {
  let component: HistoriqueDnComponent;
  let fixture: ComponentFixture<HistoriqueDnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoriqueDnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriqueDnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
