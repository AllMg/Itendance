import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImmoMvtComponent } from './immo-mvt.component';

describe('ImmoMvtComponent', () => {
  let component: ImmoMvtComponent;
  let fixture: ComponentFixture<ImmoMvtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImmoMvtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImmoMvtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
