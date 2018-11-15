import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheAmComponent } from './fiche-am.component';

describe('FicheAmComponent', () => {
  let component: FicheAmComponent;
  let fixture: ComponentFixture<FicheAmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FicheAmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FicheAmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
