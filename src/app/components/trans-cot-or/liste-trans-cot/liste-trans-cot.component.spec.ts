import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeTransCotComponent } from './liste-trans-cot.component';

describe('ListeTransCotComponent', () => {
  let component: ListeTransCotComponent;
  let fixture: ComponentFixture<ListeTransCotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeTransCotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeTransCotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
