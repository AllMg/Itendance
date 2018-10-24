import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReglementOpValidationComponent } from './reglement-op-validation.component';

describe('ReglementOpValidationComponent', () => {
  let component: ReglementOpValidationComponent;
  let fixture: ComponentFixture<ReglementOpValidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReglementOpValidationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReglementOpValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
