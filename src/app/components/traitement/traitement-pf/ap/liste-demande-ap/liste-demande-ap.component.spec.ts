import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDemandeApComponent } from './liste-demande-ap.component';

describe('ListeDemandeApComponent', () => {
  let component: ListeDemandeApComponent;
  let fixture: ComponentFixture<ListeDemandeApComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeDemandeApComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeDemandeApComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
