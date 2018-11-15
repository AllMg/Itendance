import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecompteComponent } from './decompte.component';

describe('DecompteComponent', () => {
  let component: DecompteComponent;
  let fixture: ComponentFixture<DecompteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecompteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
