import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsTransCotPiecesComponent } from './details-trans-cot-pieces.component';

describe('DetailsTransCotPiecesComponent', () => {
  let component: DetailsTransCotPiecesComponent;
  let fixture: ComponentFixture<DetailsTransCotPiecesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsTransCotPiecesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsTransCotPiecesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
