import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecAccesComponent } from './sec-acces.component';

describe('SecAccesComponent', () => {
  let component: SecAccesComponent;
  let fixture: ComponentFixture<SecAccesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecAccesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecAccesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
