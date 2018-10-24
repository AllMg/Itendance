import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtmpFd1Component } from './atmp-fd1.component';

describe('AtmpFd1Component', () => {
  let component: AtmpFd1Component;
  let fixture: ComponentFixture<AtmpFd1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtmpFd1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtmpFd1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
