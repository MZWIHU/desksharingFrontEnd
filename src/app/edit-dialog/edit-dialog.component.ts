import {Component, inject, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCalendar, MatDatepickerModule} from "@angular/material/datepicker";
import {MatCard} from "@angular/material/card";
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {provideNativeDateAdapter} from "@angular/material/core";
import {MatInputModule} from "@angular/material/input";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {ReservationService} from "../service/reservation-service.service";
import {Reservation} from "../domain/Reservation";

@Component({
  selector: 'app-edit-dialog',
  standalone: true,
  imports: [
    MatButton,
    MatCalendar,
    MatCard,
    MatDialogContent,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatTabGroup,
    MatTab
  ],
  templateUrl: './edit-dialog.component.html',
  styleUrl: './edit-dialog.component.css',
  providers: [provideNativeDateAdapter()],
})
export class EditDialogComponent implements OnInit {


  private dialogRef: MatDialogRef<EditDialogComponent> = inject(MatDialogRef<EditDialogComponent>)

  private pass: Reservation = inject(MAT_DIALOG_DATA)

  private toUpdate: Reservation;

  constructor(private reservationService: ReservationService) {
    this.toUpdate = this.pass;
  }

  ngOnInit(): void {
    this.toUpdate = this.pass;
  }

  dateUpdateForm = new FormGroup({
    date: new FormControl<Date>(new Date(this.pass.date), [
      Validators.required
    ])
  })


  onSubmit() {
    //this.toUpdate.fromTime = this.dateUpdateForm.controls.fromDate.value;
    this.updateReservation();
    this.dialogRef.close();

  }


  updateReservation() {
    this.reservationService.updateReservation(this.toUpdate);
  }

  //updates form if the user changes the input
  updateFormDate(value: any) {
    this.dateUpdateForm.get('date').setValue(value);
    this.dateUpdateForm.controls.date.value.setHours(3)
    this.dateUpdateForm.controls.date.value.setMinutes(1  )
    this.toUpdate.date = this.dateUpdateForm.get('date').value.toUTCString();
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
