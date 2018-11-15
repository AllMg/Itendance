import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IjComponent } from './ij.component';

describe('IjComponent', () => {
  let component: IjComponent;
  let fixture: ComponentFixture<IjComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IjComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
