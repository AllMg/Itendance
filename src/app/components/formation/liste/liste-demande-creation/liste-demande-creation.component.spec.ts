import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDemandeCreationComponent } from './liste-demande-creation.component';

describe('ListeDemandeCreationComponent', () => {
  let component: ListeDemandeCreationComponent;
  let fixture: ComponentFixture<ListeDemandeCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeDemandeCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeDemandeCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
