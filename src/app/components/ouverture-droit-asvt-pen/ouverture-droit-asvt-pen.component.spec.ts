import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OuvertureDroitAsvtPenComponent } from './ouverture-droit-asvt-pen.component';

describe('OuvertureDroitAsvtPenComponent', () => {
  let component: OuvertureDroitAsvtPenComponent;
  let fixture: ComponentFixture<OuvertureDroitAsvtPenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OuvertureDroitAsvtPenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OuvertureDroitAsvtPenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
