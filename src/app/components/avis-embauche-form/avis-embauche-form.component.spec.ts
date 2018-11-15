import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisEmbaucheFormComponent } from './avis-embauche-form.component';

describe('AvisEmbaucheFormComponent', () => {
  let component: AvisEmbaucheFormComponent;
  let fixture: ComponentFixture<AvisEmbaucheFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvisEmbaucheFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvisEmbaucheFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
