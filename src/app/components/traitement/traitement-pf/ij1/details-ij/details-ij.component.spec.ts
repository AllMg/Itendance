import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsIjComponent } from './details-ij.component';

describe('DetailsIjComponent', () => {
  let component: DetailsIjComponent;
  let fixture: ComponentFixture<DetailsIjComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsIjComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsIjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
