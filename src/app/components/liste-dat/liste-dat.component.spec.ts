import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDatComponent } from './liste-dat.component';

describe('ListeDatComponent', () => {
  let component: ListeDatComponent;
  let fixture: ComponentFixture<ListeDatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeDatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeDatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
