import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePosteComponent } from './table-poste.component';

describe('TablePosteComponent', () => {
  let component: TablePosteComponent;
  let fixture: ComponentFixture<TablePosteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablePosteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablePosteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
