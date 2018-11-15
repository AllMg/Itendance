import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsRfaComponent } from './details-rfa.component';

describe('DetailsRfaComponent', () => {
  let component: DetailsRfaComponent;
  let fixture: ComponentFixture<DetailsRfaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsRfaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsRfaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
