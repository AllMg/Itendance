import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImmoInventaireComponent } from './immo-inventaire.component';

describe('ImmoInventaireComponent', () => {
  let component: ImmoInventaireComponent;
  let fixture: ComponentFixture<ImmoInventaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImmoInventaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImmoInventaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
