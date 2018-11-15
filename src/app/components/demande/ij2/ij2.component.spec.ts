import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ij2Component } from './ij2.component';

describe('Ij2Component', () => {
  let component: Ij2Component;
  let fixture: ComponentFixture<Ij2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ij2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ij2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
