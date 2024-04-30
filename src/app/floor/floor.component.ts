import {AfterViewInit, Component, ElementRef, inject, Input, TemplateRef, ViewChild} from '@angular/core';
import {CommonModule} from "@angular/common";
import {Reservation} from "../domain/Reservation";
import {User} from "../domain/User";
import {Desk} from "../domain/Desk";
import {NgbAlert, NgbInputDatepicker, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PopupComponent} from "../popup/popup.component";
import {ReservationService} from "../service/reservation-service.service";


@Component({
  selector: 'app-floor',
  standalone: true,
  imports: [
    CommonModule,
    NgbInputDatepicker,
    NgbAlert
  ],
  templateUrl: './floor.component.html',
  styleUrl: './floor.component.css'
})


export class FloorComponent implements AfterViewInit {
  constructor(private modalService: NgbModal,
              private reservationService: ReservationService
  ) {
  }

  open() {
    this.modalService.open(PopupComponent, {animation: false, size: "lg"});
  }

  @ViewChild('svgObject') svgObject: ElementRef;

  ngAfterViewInit(): void {
    this.svgObject.nativeElement.addEventListener('load', () => {
      const svgDoc = this.svgObject.nativeElement.contentDocument;
      const paths = svgDoc.querySelectorAll('path');

      paths.forEach(path => {
        path.addEventListener('click', (event) => {
          this.onDeskClick(event.target);
        });
      });
    });
  }

  onDeskClick(target: any) {


    if (target.id != null && target.id != "") {
      console.log('Desk clicked:', target.id);
      this.reservationService.target = target;
      let response = this.reservationService.getReservation()
      response.subscribe(response => {
          let keys = Object.keys(response);

          let values = keys.map(k => response[k]);
          console.log("VALUE: " + values[0]);
          console.log(response)
          if (values[0] == "notReserved") {
            this.open();
          } else {
            console.log("reserved")
          }
        }
      )
    }
  }
}

