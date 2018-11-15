import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtheseComponent } from './prothese.component';

describe('ProtheseComponent', () => {
  let component: ProtheseComponent;
  let fixture: ComponentFixture<ProtheseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProtheseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtheseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
