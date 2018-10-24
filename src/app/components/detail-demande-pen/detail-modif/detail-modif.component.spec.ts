import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailModifComponent } from './detail-modif.component';

describe('DetailModifComponent', () => {
  let component: DetailModifComponent;
  let fixture: ComponentFixture<DetailModifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailModifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailModifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
