import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeMouvementRecrutementComponent } from './liste-mouvement-recrutement.component';

describe('ListeMouvementRecrutementComponent', () => {
  let component: ListeMouvementRecrutementComponent;
  let fixture: ComponentFixture<ListeMouvementRecrutementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeMouvementRecrutementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeMouvementRecrutementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
