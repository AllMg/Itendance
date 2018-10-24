import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAm2Component } from './list-am2.component';

describe('ListAm2Component', () => {
  let component: ListAm2Component;
  let fixture: ComponentFixture<ListAm2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAm2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAm2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
