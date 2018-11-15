import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DnValidationComponent } from './dn-validation.component';

describe('DnValidationComponent', () => {
  let component: DnValidationComponent;
  let fixture: ComponentFixture<DnValidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DnValidationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DnValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
