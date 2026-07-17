import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditForm } from './add-edit-form';

describe('AddEditForm', () => {
  let component: AddEditForm;
  let fixture: ComponentFixture<AddEditForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditForm],
    }).compileComponents();

    fixture = TestBed.createComponent(AddEditForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
