import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploieTempComponent } from './emploie-temp.component';

describe('EmploieTempComponent', () => {
  let component: EmploieTempComponent;
  let fixture: ComponentFixture<EmploieTempComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmploieTempComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmploieTempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
