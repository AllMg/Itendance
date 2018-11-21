import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecSysComponent } from './sec-sys.component';

describe('SecSysComponent', () => {
  let component: SecSysComponent;
  let fixture: ComponentFixture<SecSysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecSysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecSysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
