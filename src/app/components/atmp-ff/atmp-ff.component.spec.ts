import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtmpFfComponent } from './atmp-ff.component';

describe('AtmpFfComponent', () => {
  let component: AtmpFfComponent;
  let fixture: ComponentFixture<AtmpFfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtmpFfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtmpFfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
