import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RbRecetteComponent } from './rb-recette.component';

describe('RbRecetteComponent', () => {
  let component: RbRecetteComponent;
  let fixture: ComponentFixture<RbRecetteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RbRecetteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RbRecetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
