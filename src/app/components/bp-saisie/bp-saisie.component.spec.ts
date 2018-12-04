import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BpSaisieComponent } from './bp-saisie.component';

describe('BpSaisieComponent', () => {
  let component: BpSaisieComponent;
  let fixture: ComponentFixture<BpSaisieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BpSaisieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BpSaisieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
