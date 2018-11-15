import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsTransCotComponent } from './details-trans-cot.component';

describe('DetailsTransCotComponent', () => {
  let component: DetailsTransCotComponent;
  let fixture: ComponentFixture<DetailsTransCotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsTransCotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsTransCotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
