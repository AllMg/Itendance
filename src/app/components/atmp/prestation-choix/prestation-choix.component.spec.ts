import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestationChoixComponent } from './prestation-choix.component';

describe('PrestationChoixComponent', () => {
  let component: PrestationChoixComponent;
  let fixture: ComponentFixture<PrestationChoixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrestationChoixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrestationChoixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
