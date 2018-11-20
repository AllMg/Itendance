import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidRecrutComponent } from './valid-recrut.component';

describe('ValidRecrutComponent', () => {
  let component: ValidRecrutComponent;
  let fixture: ComponentFixture<ValidRecrutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidRecrutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidRecrutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
