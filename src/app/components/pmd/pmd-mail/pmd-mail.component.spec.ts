import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PmdMailComponent } from './pmd-mail.component';

describe('PmdMailComponent', () => {
  let component: PmdMailComponent;
  let fixture: ComponentFixture<PmdMailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PmdMailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PmdMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
