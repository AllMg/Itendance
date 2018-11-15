import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PratiquesComponent } from './pratiques.component';

describe('PratiquesComponent', () => {
  let component: PratiquesComponent;
  let fixture: ComponentFixture<PratiquesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PratiquesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PratiquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
