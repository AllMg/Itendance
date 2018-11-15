import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsApComponent } from './details-ap.component';

describe('DetailsApComponent', () => {
  let component: DetailsApComponent;
  let fixture: ComponentFixture<DetailsApComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsApComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsApComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
