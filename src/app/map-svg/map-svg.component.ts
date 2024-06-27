import {Component, DestroyRef, inject} from '@angular/core';
import {Reservation} from "../domain/Reservation";
import {FormDialogComponent} from "../formDialog/formDialog.component";
import {switchMap} from "rxjs";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {ReservationService} from "../service/reservation-service.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";


@Component({
  selector: 'app-map-svg',
  standalone: true,
  imports: [],
  templateUrl: './map-svg.component.svg',
  styleUrl: './map-svg.component.css'
})
export class MapSVGComponent {

  floor: string;
  amountOfDesks = 16;
  reserved = "#ff0000";
  free = "#61ff00";
  fill: string[] = []
  private reservationService: ReservationService = inject(ReservationService);
  public dialog: MatDialog = inject(MatDialog);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private destroyRef: DestroyRef = inject(DestroyRef)



  constructor() {
    this.getCurrentFloor()
    this.getReservationsByFloor(+this.floor)
    for (let i = 0; i < this.amountOfDesks; i++) {
      this.fill.push(this.free)
    }
  }

  openDialog(deskID: number, reservations: Reservation[]): void {
      const dialogRef = this.dialog.open(FormDialogComponent, {
        data: {
          floor: this.floor,
          deskID: deskID,
          reservations: reservations
        }
      });
  }

  //gets the floor currently on from the url path
  getCurrentFloor() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        (params.get('id')!))
    ).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(path => {
      this.floor = path;
    })
  }

  onDeskClick(id: string) {
      console.log("funktioniert")
    // console.log(rect)
      // console.log('Desk clicked:', target.id);
      let response = this.reservationService.getReservation(+id, +this.floor)
      response.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(response => {
          this.openDialog(+id, response);
        }
      )
    }

  getReservationsByFloor(floor: number) {
    this.reservationService.getReservationsByFloor(floor).pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(response => {
          for(let reservation of response) {
            this.fill[reservation.desk.deskID-1] = this.reserved;
          }
      });
  }
}
