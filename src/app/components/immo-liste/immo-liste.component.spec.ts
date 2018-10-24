import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImmoListeComponent } from './immo-liste.component';

describe('ImmobilisationComponent', () => {
  let component: ImmoListeComponent;
  let fixture: ComponentFixture<ImmoListeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImmoListeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImmoListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
