import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeRippComponent } from './demande-ripp.component';

describe('DemandeRippComponent', () => {
  let component: DemandeRippComponent;
  let fixture: ComponentFixture<DemandeRippComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandeRippComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeRippComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
