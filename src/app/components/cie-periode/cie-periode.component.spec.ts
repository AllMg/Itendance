import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CiePeriodeComponent } from './cie-periode.component';

describe('CiePeriodeComponent', () => {
  let component: CiePeriodeComponent;
  let fixture: ComponentFixture<CiePeriodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CiePeriodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CiePeriodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
