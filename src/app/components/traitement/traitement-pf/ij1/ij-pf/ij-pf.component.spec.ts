import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IjPfComponent } from './ij-pf.component';

describe('IjPfComponent', () => {
  let component: IjPfComponent;
  let fixture: ComponentFixture<IjPfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IjPfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IjPfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
