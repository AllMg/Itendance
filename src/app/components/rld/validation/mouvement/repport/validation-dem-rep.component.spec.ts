import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationDemRepComponent } from './validation-dem-rep.component';

describe('ValidationDemRepComponent', () => {
  let component: ValidationDemRepComponent;
  let fixture: ComponentFixture<ValidationDemRepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationDemRepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationDemRepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
