import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationDemRetComponent } from './validation-dem-ret.component';

describe('ValidationDemRetComponent', () => {
  let component: ValidationDemRetComponent;
  let fixture: ComponentFixture<ValidationDemRetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationDemRetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationDemRetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
