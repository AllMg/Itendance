import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraitDlprComponent } from './trait-dlpr.component';

describe('TraitDlprComponent', () => {
  let component: TraitDlprComponent;
  let fixture: ComponentFixture<TraitDlprComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraitDlprComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraitDlprComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
