import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeDemissionComponent } from './demande-demission.component';

describe('DemandeDemissionComponent', () => {
  let component: DemandeDemissionComponent;
  let fixture: ComponentFixture<DemandeDemissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandeDemissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeDemissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
