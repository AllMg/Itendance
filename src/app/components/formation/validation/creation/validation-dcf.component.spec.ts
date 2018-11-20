import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationDcfComponent } from './validation-dcf.component';

describe('ValidationDcfComponent', () => {
  let component: ValidationDcfComponent;
  let fixture: ComponentFixture<ValidationDcfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationDcfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationDcfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
