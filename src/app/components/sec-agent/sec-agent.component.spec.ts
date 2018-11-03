import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecAgentComponent } from './sec-agent.component';

describe('SecAgentComponent', () => {
  let component: SecAgentComponent;
  let fixture: ComponentFixture<SecAgentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecAgentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
