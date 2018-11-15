import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecompteIj2Component } from './decompte-ij2.component';

describe('DecompteIj2Component', () => {
  let component: DecompteIj2Component;
  let fixture: ComponentFixture<DecompteIj2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecompteIj2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecompteIj2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
