import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewIndividusComponent } from './new-individus.component';

describe('NewIndividusComponent', () => {
  let component: NewIndividusComponent;
  let fixture: ComponentFixture<NewIndividusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewIndividusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewIndividusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
