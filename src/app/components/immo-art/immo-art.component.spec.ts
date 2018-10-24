import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImmoArtComponent } from './immo-art.component';

describe('ImmoArtComponent', () => {
  let component: ImmoArtComponent;
  let fixture: ComponentFixture<ImmoArtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImmoArtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImmoArtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
