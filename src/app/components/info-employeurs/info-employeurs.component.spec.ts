import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoEmployeursComponent } from './info-employeurs.component';

describe('InfoEmployeursComponent', () => {
  let component: InfoEmployeursComponent;
  let fixture: ComponentFixture<InfoEmployeursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoEmployeursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoEmployeursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
