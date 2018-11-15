import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCentreComponent } from './menu-centre.component';

describe('MenuCentreComponent', () => {
  let component: MenuCentreComponent;
  let fixture: ComponentFixture<MenuCentreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuCentreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuCentreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
