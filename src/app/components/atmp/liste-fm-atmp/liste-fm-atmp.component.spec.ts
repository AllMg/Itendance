import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeFmAtmpComponent } from './liste-fm-atmp.component';

describe('ListeFmAtmpComponent', () => {
  let component: ListeFmAtmpComponent;
  let fixture: ComponentFixture<ListeFmAtmpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeFmAtmpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeFmAtmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
