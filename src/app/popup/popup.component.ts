import {Component, EventEmitter, inject, OnInit} from '@angular/core';
import {NgbActiveModal, NgbDate, NgbInputDatepicker} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ReservationService} from "../service/reservation-service.service";

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [
    NgbInputDatepicker,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent {
  activeModal = inject(NgbActiveModal);

  constructor(private reservationService: ReservationService) {
  }

  nameInputForm = new FormGroup({
    name: new FormControl<string>('', [
      Validators.required
    ])
  })
  makeReservation() {
    console.log(!this.nameInputForm.valid)
    console.log(this.nameInputForm.get('name').value)
    //this.reservationService.makeReservation()
  }
}
