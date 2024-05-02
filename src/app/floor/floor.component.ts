import {AfterViewInit, Component, ElementRef, inject, Input, TemplateRef, ViewChild} from '@angular/core';
import {CommonModule} from "@angular/common";
import {PopupComponent} from "../popup/popup.component";
import {ReservationService} from "../service/reservation-service.service";
import {Response} from "../domain/Response";
import {MatFormField} from "@angular/material/form-field";
import {MatDialog} from "@angular/material/dialog";


@Component({
  selector: 'app-floor',
  standalone: true,
  imports: [
    CommonModule,
    MatFormField,
  ],
  templateUrl: './floor.component.html',
  styleUrl: './floor.component.css'
})


export class FloorComponent implements AfterViewInit {

  resp: Response | undefined;


  constructor(
              private reservationService: ReservationService,
              public dialog: MatDialog
  ) {
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

  openDialog(): void {
    const dialogRef = this.dialog.open(PopupComponent, {});
  }

  onDeskClick(target: any) {

    if (target.id != null && target.id != "") {
      console.log('Desk clicked:', target.id);
      this.reservationService.target = target;
      let response = this.reservationService.getReservation()
      response.subscribe(response => {
        this.resp = {
          value: response.value
        }
          if(this.resp.value == "notReserved") {
            this.openDialog()
          } else {
            console.log("Reserved")
          }
        }
      )
    }
  }
}

