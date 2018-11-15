import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoAgentsComponent } from './info-agents.component';

describe('InfoAgentsComponent', () => {
  let component: InfoAgentsComponent;
  let fixture: ComponentFixture<InfoAgentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoAgentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoAgentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
