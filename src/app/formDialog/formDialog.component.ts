import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ReservationService} from "../service/reservation-service.service";
import {MatButton} from "@angular/material/button";
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {MatFormField} from "@angular/material/form-field";
import {MatCard} from "@angular/material/card";
import {MatCalendar, MatDatepickerInput} from "@angular/material/datepicker";
import {provideNativeDateAdapter} from "@angular/material/core";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-popup',
  standalone: true,
  templateUrl: './formDialog.component.html',
  imports: [
    ReactiveFormsModule,
    MatButton,
    MatDialogTitle,
    MatDialogContent,
    MatFormField,
    MatDialogActions,
    MatCard,
    MatCalendar,
    MatDatepickerInput
  ],
  providers: [provideNativeDateAdapter()],
  styleUrl: './formDialog.component.css'
})
export class FormDialogComponent implements OnInit {

  constructor(private reservationService: ReservationService,
              public dialogRef: MatDialogRef<FormDialogComponent>,
              private snackBar: MatSnackBar) {
    console.log("CONSTRUCTOR")
  }

  ngOnInit(): void {
    console.log("INIT")
  }

  dateInputForm = new FormGroup({
    date: new FormControl<Date>(null, [
      Validators.required
    ])
  })



  onSubmit() {
    console.log("submit")
    this.makeReservation();
    this.dialogRef.close();

  }


  makeReservation() {
    console.log(!this.dateInputForm.valid)
    console.log(this.dateInputForm.get('date').value.toLocaleDateString())
    //this.reservationService.makeReservation()
  }

  updateFormDate(value: any) {
    this.dateInputForm.get('date').setValue(value);
  }

  closeDialog() {
    this.dialogRef.close();
  }

  openSnackBar() {
    this.snackBar.open("Reserved", "", {
      duration: 5000
    });
  }

}
