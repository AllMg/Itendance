import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheApComponent } from './fiche-ap.component';

describe('FicheApComponent', () => {
  let component: FicheApComponent;
  let fixture: ComponentFixture<FicheApComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FicheApComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FicheApComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
