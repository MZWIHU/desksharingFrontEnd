import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  NgZone,
  OnInit,
  ViewChild
} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormDialogComponent} from "../formDialog/formDialog.component";
import {ReservationService} from "../service/reservation-service.service";
import {MatFormField} from "@angular/material/form-field";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, ParamMap, RouterLink} from "@angular/router";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {MatToolbarRow} from "@angular/material/toolbar";
import {MatButton} from "@angular/material/button";
import {switchMap} from "rxjs";


@Component({
  selector: 'app-floor',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    MatFormField,
    MatToolbarRow,
    MatButton
  ],
  templateUrl: './floor.component.html',
  styleUrl: './floor.component.css'
})


export class FloorComponent implements OnInit, AfterViewInit {

  path = "";
  safePath: SafeResourceUrl = "";

  constructor(
    private reservationService: ReservationService,
    public dialog: MatDialog,
    private zone: NgZone,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {
  }

  ngOnInit() {
    this.changeFloor(false);
  }

  getPath() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.path);
  }

  @ViewChild('svgObject') svgObject: ElementRef;
/*
  @HostListener('click')
  onFloorComponentClicked(event: MouseEvent) {
    this.getClickedElement(event);
  }

  private getClickedElement(event: MouseEvent) {
    this.onDeskClick(event.target);
      //Array.from(this.floor.children).find(el => el.contains(event.target))
   // )
  }
  */

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


openDialog():void {
  const dialogRef = this.dialog.open(FormDialogComponent);
}

changeFloor(reload: boolean)
{
  this.route.paramMap.pipe(
    switchMap((params: ParamMap) =>
      (params.get('id')!))
  ).subscribe(path => {
      this.path = "assets/floor" + path + ".svg";
      this.safePath = this.getPath();
      console.log(this.safePath);
      if(reload) {
        window.location.reload();
      }
    }
  );
}

onDeskClick(target: any)
{
  let rect =
    document.getElementById('all')
  console.log(rect)
  if (target.id != null && target.id != "") {
    console.log('Desk clicked:', target.id);
    this.reservationService.target = target;
    /*
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
    ) */
    this.zone.run(() => {
      this.openDialog();
    })
  }
}
}

