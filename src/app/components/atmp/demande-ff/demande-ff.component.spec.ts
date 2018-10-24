import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeFfComponent } from './demande-ff.component';

describe('DemandeFfComponent', () => {
  let component: DemandeFfComponent;
  let fixture: ComponentFixture<DemandeFfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandeFfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeFfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
