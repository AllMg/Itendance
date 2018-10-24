import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutreLienComponent } from './autre-lien.component';

describe('AutreLienComponent', () => {
  let component: AutreLienComponent;
  let fixture: ComponentFixture<AutreLienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutreLienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutreLienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
