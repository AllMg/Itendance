import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnapsMapComponent } from './cnaps-map.component';

describe('CnapsMapComponent', () => {
  let component: CnapsMapComponent;
  let fixture: ComponentFixture<CnapsMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnapsMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnapsMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
