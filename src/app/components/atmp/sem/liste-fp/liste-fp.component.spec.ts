import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeFpComponent } from './liste-fp.component';

describe('ListeFpComponent', () => {
  let component: ListeFpComponent;
  let fixture: ComponentFixture<ListeFpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeFpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeFpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
