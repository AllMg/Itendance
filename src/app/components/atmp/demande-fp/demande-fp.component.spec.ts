import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeFpComponent } from './demande-fp.component';

describe('DemandeFpComponent', () => {
  let component: DemandeFpComponent;
  let fixture: ComponentFixture<DemandeFpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandeFpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeFpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
