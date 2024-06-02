import { Component } from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow,
  MatHeaderRowDef, MatRow, MatRowDef, MatTable
} from "@angular/material/table";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-reservation-overview',
  standalone: true,
  imports: [
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatCellDef,
    MatHeaderCellDef,
    MatHeaderRowDef,
    MatRowDef,
    MatRow,
    MatHeaderRow,
    MatTable,
    MatIconButton,
    MatIcon
  ],
  templateUrl: './reservation-overview.component.html',
  styleUrl: './reservation-overview.component.css'
})
export class ReservationOverviewComponent {
  displayedColumns: string[] = ['position', 'desk', 'date', `action`];
  dataSource = ELEMENT_DATA;

  delete(position) {
    console.log(position)
  }
}

export interface PeriodicElement {
  desk: string;
  position: number;
  date: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, desk: '1.OG Desk1', date: "10-10-2024"},
  {position: 2, desk: '3.OG Desk20', date: "10-10-2024" },
  {position: 3, desk: '3.OG Desk20', date: "10-10-2024"},
  {position: 4, desk: '2.OG Desk2', date: "10-10-2024" },
  {position: 5, desk: '2.OG Desk2', date: "10-10-2024"}
];

