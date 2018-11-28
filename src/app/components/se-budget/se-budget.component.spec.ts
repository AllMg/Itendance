import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeBudgetComponent } from './se-budget.component';

describe('SeBudgetComponent', () => {
  let component: SeBudgetComponent;
  let fixture: ComponentFixture<SeBudgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeBudgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
