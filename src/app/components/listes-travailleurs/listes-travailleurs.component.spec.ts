import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListesTravailleursComponent } from './listes-travailleurs.component';

describe('ListesTravailleursComponent', () => {
  let component: ListesTravailleursComponent;
  let fixture: ComponentFixture<ListesTravailleursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListesTravailleursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListesTravailleursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
