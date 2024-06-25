import {Reservation} from "./Reservation";

export interface DialogData{
  floor: string,
  deskID: number,
  reservations: Reservation[]
}
