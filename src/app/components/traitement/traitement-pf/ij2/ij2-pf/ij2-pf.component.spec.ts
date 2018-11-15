import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ij2PfComponent } from './ij2-pf.component';

describe('Ij2PfComponent', () => {
  let component: Ij2PfComponent;
  let fixture: ComponentFixture<Ij2PfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ij2PfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ij2PfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
