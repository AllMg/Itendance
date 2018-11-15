import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtmpRenteComponent } from './atmp-rente.component';

describe('AtmpRenteComponent', () => {
  let component: AtmpRenteComponent;
  let fixture: ComponentFixture<AtmpRenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtmpRenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtmpRenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
