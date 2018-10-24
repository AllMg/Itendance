import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DimmComponent } from './dimm.component';

describe('DimmComponent', () => {
  let component: DimmComponent;
  let fixture: ComponentFixture<DimmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DimmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DimmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
