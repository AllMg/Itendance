import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnapsSportComponent } from './cnaps-sport.component';

describe('CnapsSportComponent', () => {
  let component: CnapsSportComponent;
  let fixture: ComponentFixture<CnapsSportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnapsSportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnapsSportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
