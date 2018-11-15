import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtmpFmComponent } from './atmp-fm.component';

describe('AtmpFmComponent', () => {
  let component: AtmpFmComponent;
  let fixture: ComponentFixture<AtmpFmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtmpFmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtmpFmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
