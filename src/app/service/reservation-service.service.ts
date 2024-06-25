import {HttpClient, HttpHeaders} from '@angular/common/http';
import {DestroyRef, inject, Injectable} from '@angular/core';
import {Response} from "../domain/Response";
import {Reservation} from "../domain/Reservation";
import {User} from "../domain/User";
import {Desk} from "../domain/Desk";
import {Observable} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {


  destroyRef: DestroyRef = inject(DestroyRef)

  constructor(private http: HttpClient) {

  }

  getReservation(targetID: number, floor: number): Observable<Reservation[]> {
    const headers: HttpHeaders = new HttpHeaders();
    headers.set("Content-Type", "application/json");
    headers.set("Accept", "application/json");


    //return this.http.get<Response>('https://desksharing.onrender.com/reservation?deskID=' + this.target.id, {headers})
    return this.http.get<Reservation[]>('http://localhost:8090/deskReservations?deskID=' + targetID + "&floor=" + floor, {headers})
  }

  makeReservation(date: Date,  floor: number, deskID: number): String {
    const headers: HttpHeaders = new HttpHeaders();
    headers.set("Content-Type", "application/json");
    headers.set("Accept", "application/json");
    date.setHours(2);
    date.setMinutes(1)
    date.setSeconds(0)

    //console.log(toTime.toISOString())
    let request = new Reservation(date.toUTCString(),
      new User("zwm@wuestenrot.at", "Martin", "Zwicklhuber")
      , new Desk(deskID, floor));

    //this.http.post("https://desksharing.onrender.com/reservation", request, {headers}).subscribe(
      this.http.post("http://localhost:8090/reservation", request, {headers}).subscribe(
      response => {
        //console.log(response)
      }
    )

    return null;
  }

  getReservationByUserMail(userMail: string): Observable<Reservation[]> {
    let reservations: Reservation[];
    const headers: HttpHeaders = new HttpHeaders();
    headers.set("Content-Type", "application/json");
    headers.set("Accept", "application/json");


    //this.http.post("https://desksharing.onrender.com/reservation", request, {headers}).subscribe(
    return this.http.get<Reservation[]>("http://localhost:8090/userReservations?userMail=" + userMail, {headers})
  }

  updateReservation(reservation: Reservation){
    //console.log()
    const headers: HttpHeaders = new HttpHeaders();
    headers.set("Content-Type", "application/json");
    headers.set("Accept", "application/json");

    console.log("SEND")
    this.http.put("http://localhost:8090/reservation", reservation, { headers }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(
      _ =>{}
    )

  }

  getReservationsByFloor(floor: number) {
    let reservations: Reservation[];
    const headers: HttpHeaders = new HttpHeaders();
    headers.set("Content-Type", "application/json");
    headers.set("Accept", "application/json");

    //this.http.post("https://desksharing.onrender.com/reservation", request, {headers}).subscribe(
    return this.http.get<Reservation[]>("http://localhost:8090/reservations-by-floor?floor=" + floor, {headers})
  }

}
