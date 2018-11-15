import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeFmComponent } from './demande-fm.component';

describe('DemandeFmComponent', () => {
  let component: DemandeFmComponent;
  let fixture: ComponentFixture<DemandeFmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandeFmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeFmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
