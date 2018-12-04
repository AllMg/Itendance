import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BpElaborationComponent } from './bp-elaboration.component';

describe('BpElaborationComponent', () => {
  let component: BpElaborationComponent;
  let fixture: ComponentFixture<BpElaborationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BpElaborationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BpElaborationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
