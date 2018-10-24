import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPersonnesComponent } from './info-personnes.component';

describe('InfoPersonnesComponent', () => {
  let component: InfoPersonnesComponent;
  let fixture: ComponentFixture<InfoPersonnesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoPersonnesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoPersonnesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
