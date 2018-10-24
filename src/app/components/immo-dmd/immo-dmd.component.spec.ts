import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImmoDmdComponent } from './immo-dmd.component';

describe('ImmoDmd', () => {
  let component: ImmoDmdComponent;
  let fixture: ComponentFixture<ImmoDmdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImmoDmdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImmoDmdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
