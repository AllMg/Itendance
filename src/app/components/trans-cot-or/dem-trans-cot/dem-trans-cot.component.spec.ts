import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemTransCotComponent } from './dem-trans-cot.component';

describe('DemTransCotComponent', () => {
  let component: DemTransCotComponent;
  let fixture: ComponentFixture<DemTransCotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemTransCotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemTransCotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
