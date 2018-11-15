import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenteIppComponent } from './rente-ipp.component';

describe('RenteIppComponent', () => {
  let component: RenteIppComponent;
  let fixture: ComponentFixture<RenteIppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenteIppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenteIppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
