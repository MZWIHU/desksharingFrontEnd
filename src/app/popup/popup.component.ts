import {Component, EventEmitter, inject} from '@angular/core';
import {NgbActiveModal, NgbDate, NgbInputDatepicker} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from "@angular/forms";
import {ReservationService} from "../service/reservation-service.service";

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [
    NgbInputDatepicker,
    FormsModule
  ],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent {

  constructor(private reservationService: ReservationService) {
  }
  activeModal = inject(NgbActiveModal);
  date: any;

  makeReservation() {
    this.reservationService.makeReservation()
  }
}
