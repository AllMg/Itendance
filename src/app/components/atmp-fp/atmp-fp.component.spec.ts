import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtmpFpComponent } from './atmp-fp.component';

describe('AtmpFpComponent', () => {
  let component: AtmpFpComponent;
  let fixture: ComponentFixture<AtmpFpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtmpFpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtmpFpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
