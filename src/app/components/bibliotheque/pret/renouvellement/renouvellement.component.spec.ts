import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenouvellementComponent } from './renouvellement.component';

describe('RenouvellementComponent', () => {
  let component: RenouvellementComponent;
  let fixture: ComponentFixture<RenouvellementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenouvellementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenouvellementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
