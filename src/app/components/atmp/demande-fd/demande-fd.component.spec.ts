import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeFdComponent } from './demande-fd.component';

describe('DemandeFdComponent', () => {
  let component: DemandeFdComponent;
  let fixture: ComponentFixture<DemandeFdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandeFdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeFdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
