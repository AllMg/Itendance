import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BpDocumentComponent } from './bp-document.component';

describe('BpDocumentComponent', () => {
  let component: BpDocumentComponent;
  let fixture: ComponentFixture<BpDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BpDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BpDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
