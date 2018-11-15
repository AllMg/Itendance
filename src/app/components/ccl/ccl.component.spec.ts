import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CclComponent } from './ccl.component';

describe('CclComponent', () => {
  let component: CclComponent;
  let fixture: ComponentFixture<CclComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CclComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CclComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
