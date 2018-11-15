import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeRmComponent } from './demande-rm.component';

describe('DemandeRmComponent', () => {
  let component: DemandeRmComponent;
  let fixture: ComponentFixture<DemandeRmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandeRmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeRmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
