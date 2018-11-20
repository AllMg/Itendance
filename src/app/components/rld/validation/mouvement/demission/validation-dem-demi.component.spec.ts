import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationDemDemiComponent } from './validation-dem-demi.component';

describe('ValidationDemDemiComponent', () => {
  let component: ValidationDemDemiComponent;
  let fixture: ComponentFixture<ValidationDemDemiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationDemDemiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationDemDemiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
