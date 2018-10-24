import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdoComponent } from './ordo.component';

describe('OrdoComponent', () => {
  let component: OrdoComponent;
  let fixture: ComponentFixture<OrdoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
