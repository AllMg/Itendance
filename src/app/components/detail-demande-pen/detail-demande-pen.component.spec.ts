import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailDemandePenComponent } from './detail-demande-pen.component';

describe('DetailDemandePenComponent', () => {
  let component: DetailDemandePenComponent;
  let fixture: ComponentFixture<DetailDemandePenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailDemandePenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailDemandePenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
