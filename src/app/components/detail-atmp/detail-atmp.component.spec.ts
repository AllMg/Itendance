import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAtmpComponent } from './detail-atmp.component';

describe('DetailAtmpComponent', () => {
  let component: DetailAtmpComponent;
  let fixture: ComponentFixture<DetailAtmpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailAtmpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailAtmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
