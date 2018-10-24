import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeRappelPenComponent } from './demande-rappel-pen.component';

describe('DemandeRappelPenComponent', () => {
  let component: DemandeRappelPenComponent;
  let fixture: ComponentFixture<DemandeRappelPenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandeRappelPenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeRappelPenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
