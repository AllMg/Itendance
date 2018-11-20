import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationDemRecrutComponent } from './validation-dem-recrut.component';

describe('ValidationDemRecrutComponent', () => {
  let component: ValidationDemRecrutComponent;
  let fixture: ComponentFixture<ValidationDemRecrutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationDemRecrutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationDemRecrutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
