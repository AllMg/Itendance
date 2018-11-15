import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeFmComponent } from './liste-fm.component';

describe('ListeFmComponent', () => {
  let component: ListeFmComponent;
  let fixture: ComponentFixture<ListeFmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeFmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeFmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
