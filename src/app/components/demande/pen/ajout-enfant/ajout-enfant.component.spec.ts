import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutEnfantComponent } from './ajout-enfant.component';

describe('AjoutEnfantComponent', () => {
  let component: AjoutEnfantComponent;
  let fixture: ComponentFixture<AjoutEnfantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutEnfantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutEnfantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
