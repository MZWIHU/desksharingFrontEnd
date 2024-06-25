import {AfterViewInit, Component, DestroyRef, ElementRef, HostListener, inject, NgZone, ViewChild} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormDialogComponent} from "../formDialog/formDialog.component";
import {ReservationService} from "../service/reservation-service.service";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, ParamMap, RouterLink} from "@angular/router";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {MatToolbarRow} from "@angular/material/toolbar";
import {MatButton} from "@angular/material/button";
import {switchMap} from "rxjs";
import {Desk} from "../domain/Desk";
import {Reservation} from "../domain/Reservation";
import {User} from "../domain/User";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MatTableDataSource, MatTableModule
} from "@angular/material/table";
import {MatInputModule} from "@angular/material/input";
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from "@angular/material/sort";

@Component({
  selector: 'app-floor',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    MatToolbarRow,
    MatButton,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
  ],
  templateUrl: './floor.component.html',
  styleUrl: './floor.component.css'
})

export class FloorComponent implements AfterViewInit {

  path = "";
  safePath: SafeResourceUrl = "";
  numberOfDesks: number = 39;
  floor: string;
  displayedColumns: string[] = ['desk', 'date', 'user'];
  reservations: Reservation[] = [];
  dataSource: MatTableDataSource<Reservation>;
  private reservationService: ReservationService = inject(ReservationService);
  public dialog: MatDialog = inject(MatDialog);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private sanitizer: DomSanitizer = inject(DomSanitizer);
  private destroyRef: DestroyRef = inject(DestroyRef)
  private zone: NgZone = inject(NgZone)

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('svgObject') svgObject: ElementRef;

  constructor() {
    this.getCurrentFloor()
    this.changeFloor(false);

    for (let i = 1; i <= this.numberOfDesks; i++) {
      this.reservations.push(new Reservation("", new User("", "", ""), new Desk(i, +this.floor)));
    }
    this.getReservationsByFloor(+this.floor)
    console.log(this.reservations)
  }

  getPath() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.path);
  }

  @HostListener('click')
  onFloorComponentClicked(event: MouseEvent) {
    this.getClickedElement(event);
  }

  private getClickedElement(event: MouseEvent) {
    this.onDeskClick(event.target);
    //Array.from(this.floor.children).find(el => el.contains(event.target))
    // )
  }

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

  openDialog(deskID: number, reservations: Reservation[]): void {
    this.zone.run(_ => {
      const dialogRef = this.dialog.open(FormDialogComponent, {
        data: {
          floor: this.floor,
          deskID: deskID,
          reservations: reservations
        }
      });
    })
  }

  getCurrentFloor() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        (params.get('id')!))
    ).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(path => {
      this.floor = path;
      this.path = this.path = "assets/floor" + path + ".svg";
    })
  }

  changeFloor(reload: boolean) {
    this.safePath = this.getPath();
    console.log(this.safePath);
    if (reload) {
      window.location.reload();
    }
  }

  onDeskClick(target: any) {
    let rect =
      document.getElementById('all')
    // console.log(rect)
    if (target.id != null && target.id != "") {
      // console.log('Desk clicked:', target.id);
      let response = this.reservationService.getReservation(target.id, +this.floor)
      response.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(response => {
          this.openDialog(target.id, response);
        }
      )
    }
  }

  getReservationsByFloor(floor: number) {
    let dbReservations: Reservation[] = [];

    this.reservationService.getReservationsByFloor(floor).pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(response => {
        dbReservations = response;

        for (let reservation of dbReservations) {
          this.reservations[reservation.desk.deskID - 1] = reservation;
          console.log(this.reservations[reservation.desk.deskID])
        }
        console.log(this.reservations)
        this.dataSource = new MatTableDataSource(this.reservations);
        this.dataSource.paginator = this.paginator;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
