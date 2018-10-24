import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationDatComponent } from './validation-dat.component';

describe('ValidationDatComponent', () => {
  let component: ValidationDatComponent;
  let fixture: ComponentFixture<ValidationDatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationDatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationDatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
