import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnapsServiceComponent } from './cnaps-service.component';

describe('CnapsServiceComponent', () => {
  let component: CnapsServiceComponent;
  let fixture: ComponentFixture<CnapsServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnapsServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnapsServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
