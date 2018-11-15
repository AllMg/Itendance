import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Am2Component } from './am2.component';

describe('Am2Component', () => {
  let component: Am2Component;
  let fixture: ComponentFixture<Am2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Am2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Am2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
