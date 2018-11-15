import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LienFootComponent } from './lien-foot.component';

describe('LienFootComponent', () => {
  let component: LienFootComponent;
  let fixture: ComponentFixture<LienFootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LienFootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LienFootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
