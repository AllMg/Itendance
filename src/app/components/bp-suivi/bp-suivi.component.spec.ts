import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BpSuiviComponent } from './bp-suivi.component';

describe('BpSuiviComponent', () => {
  let component: BpSuiviComponent;
  let fixture: ComponentFixture<BpSuiviComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BpSuiviComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BpSuiviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
