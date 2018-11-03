import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecVisiteurComponent } from './sec-visiteur.component';

describe('SecVisiteurComponent', () => {
  let component: SecVisiteurComponent;
  let fixture: ComponentFixture<SecVisiteurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecVisiteurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecVisiteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
