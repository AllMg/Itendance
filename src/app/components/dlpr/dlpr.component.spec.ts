import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DlprComponent } from './dlpr.component';

describe('DlprComponent', () => {
  let component: DlprComponent;
  let fixture: ComponentFixture<DlprComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DlprComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DlprComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
