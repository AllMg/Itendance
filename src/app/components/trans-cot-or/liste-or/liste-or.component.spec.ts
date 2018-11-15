import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeOrComponent } from './liste-or.component';

describe('ListeOrComponent', () => {
  let component: ListeOrComponent;
  let fixture: ComponentFixture<ListeOrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeOrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeOrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
