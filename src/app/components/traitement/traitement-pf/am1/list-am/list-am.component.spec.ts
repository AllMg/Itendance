import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAmComponent } from './list-am.component';

describe('ListAmComponent', () => {
  let component: ListAmComponent;
  let fixture: ComponentFixture<ListAmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
