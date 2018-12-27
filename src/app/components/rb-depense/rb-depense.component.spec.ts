import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RbDepenseComponent } from './rb-depense.component';

describe('RbDepenseComponent', () => {
  let component: RbDepenseComponent;
  let fixture: ComponentFixture<RbDepenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RbDepenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RbDepenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
