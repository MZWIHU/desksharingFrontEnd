import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormField} from "@angular/material/form-field";
import {MatDialogActions, MatDialogClose, MatDialogContent} from "@angular/material/dialog";

@Component({
  selector: 'app-popup',
  standalone: true,
  templateUrl: './popup.component.html',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    FormsModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose
  ],
  styleUrl: './popup.component.css'
})
export class PopupComponent implements OnInit{

  ngOnInit() {
    console.log("INIT")
  }
/*
  dateInputForm = new FormGroup({
    date: new FormControl(null,  [
       Validators.required
    ])
  })

  constructor(private reservationService: ReservationService,
              public activeModal: NgbActiveModal) {
    console.log("CONSTRUCTOR")
    console.log("TEST")
    this.dateInputForm.get("date").statusChanges.subscribe(status => {
      console.log(status)})
  }

  onSubmit() {
    console.log("submit")
    this.makeReservation();
    this.activeModal.close()
  }


  makeReservation() {
    console.log(!this.dateInputForm.valid)
    console.log(this.dateInputForm.get('date').value)
    //this.reservationService.makeReservation()
  }
  */
}
