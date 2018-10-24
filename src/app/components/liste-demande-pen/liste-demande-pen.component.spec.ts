import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDemandePenComponent } from './liste-demande-pen.component';

describe('ListeDemandePenComponent', () => {
  let component: ListeDemandePenComponent;
  let fixture: ComponentFixture<ListeDemandePenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeDemandePenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeDemandePenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
