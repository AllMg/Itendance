import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeRepportComponent } from './demande-repport.component';

describe('DemandeRepportComponent', () => {
  let component: DemandeRepportComponent;
  let fixture: ComponentFixture<DemandeRepportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandeRepportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeRepportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
