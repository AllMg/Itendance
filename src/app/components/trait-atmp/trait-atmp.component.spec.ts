import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraitAtmpComponent } from './trait-atmp.component';

describe('TraitAtmpComponent', () => {
  let component: TraitAtmpComponent;
  let fixture: ComponentFixture<TraitAtmpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraitAtmpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraitAtmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
