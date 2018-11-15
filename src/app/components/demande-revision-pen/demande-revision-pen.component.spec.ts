import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeRevisionPenComponent } from './demande-revision-pen.component';

describe('DemandeRevisionPenComponent', () => {
  let component: DemandeRevisionPenComponent;
  let fixture: ComponentFixture<DemandeRevisionPenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandeRevisionPenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeRevisionPenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
