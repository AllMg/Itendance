import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReglementOpComponent } from './reglement-op.component';

describe('ReglementOpComponent', () => {
  let component: ReglementOpComponent;
  let fixture: ComponentFixture<ReglementOpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReglementOpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReglementOpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
