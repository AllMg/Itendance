import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoDemandeComponent } from './info-demande.component';

describe('InfoDemandeComponent', () => {
  let component: InfoDemandeComponent;
  let fixture: ComponentFixture<InfoDemandeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoDemandeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoDemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
