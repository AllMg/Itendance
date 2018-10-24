import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilConnecteComponent } from './accueil-connecte.component';

describe('AccueilConnecteComponent', () => {
  let component: AccueilConnecteComponent;
  let fixture: ComponentFixture<AccueilConnecteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccueilConnecteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccueilConnecteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
