import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Am1Component } from './am1.component';

describe('Am1Component', () => {
  let component: Am1Component;
  let fixture: ComponentFixture<Am1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Am1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Am1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
