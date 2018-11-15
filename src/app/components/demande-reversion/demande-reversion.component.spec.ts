import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeReversionComponent } from './demande-reversion.component';

describe('DemandeReversionComponent', () => {
  let component: DemandeReversionComponent;
  let fixture: ComponentFixture<DemandeReversionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandeReversionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeReversionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
