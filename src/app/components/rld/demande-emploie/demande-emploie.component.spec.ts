import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeEmploieComponent } from './demande-emploie.component';

describe('DemandeEmploieComponent', () => {
  let component: DemandeEmploieComponent;
  let fixture: ComponentFixture<DemandeEmploieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandeEmploieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeEmploieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
