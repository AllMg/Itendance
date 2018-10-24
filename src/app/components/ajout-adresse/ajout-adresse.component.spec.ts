import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutAdresseComponent } from './ajout-adresse.component';

describe('AjoutAdresseComponent', () => {
  let component: AjoutAdresseComponent;
  let fixture: ComponentFixture<AjoutAdresseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutAdresseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutAdresseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
