import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeFpAtmpComponent } from './liste-fp-atmp.component';

describe('ListeFpAtmpComponent', () => {
  let component: ListeFpAtmpComponent;
  let fixture: ComponentFixture<ListeFpAtmpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeFpAtmpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeFpAtmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
