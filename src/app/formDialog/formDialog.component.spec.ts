import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDialogComponent } from './formDialog.component';

describe('PopupComponent', () => {
  let component: FormDialogComponent;
  let fixture: ComponentFixture<FormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
