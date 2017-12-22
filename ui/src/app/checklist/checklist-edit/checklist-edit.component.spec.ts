import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistEditComponent } from './checklist-edit.component';

describe('ChecklistEditComponent', () => {
  let component: ChecklistEditComponent;
  let fixture: ComponentFixture<ChecklistEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChecklistEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
