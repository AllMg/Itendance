import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeIndicateursComponent } from './liste-indicateurs.component';

describe('ListeIndicateursComponent', () => {
  let component: ListeIndicateursComponent;
  let fixture: ComponentFixture<ListeIndicateursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeIndicateursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeIndicateursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
