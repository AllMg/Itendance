import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeRembComponent } from './liste-remb.component';

describe('ListeRembComponent', () => {
  let component: ListeRembComponent;
  let fixture: ComponentFixture<ListeRembComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeRembComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeRembComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
