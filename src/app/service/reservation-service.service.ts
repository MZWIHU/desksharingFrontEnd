import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Response} from "../domain/Response";
import {Reservation} from "../domain/Reservation";
import {User} from "../domain/User";
import {Desk} from "../domain/Desk";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  public target: any;

  constructor(private http: HttpClient) {

  }

  getReservation(): Observable<Response> {
    const headers: HttpHeaders = new HttpHeaders();
    headers.set("Content-Type", "application/json");
    headers.set("Accept", "application/json");


    return this.http.get<Response>('https://desksharing.onrender.com/reservation?deskID=' + this.target.id, {headers})
    //return this.http.get<Response>('http://localhost:8090/reservation?deskID=' + this.target.id, {headers})
  }

  makeReservation(): String {
    const headers: HttpHeaders = new HttpHeaders();
    headers.set("Content-Type", "application/json");
    headers.set("Accept", "application/json");
    let dateTime = new Date();

    let request = new Reservation(dateTime.toISOString(), dateTime.toISOString(),
      new User("zwm", "zwm@wuestenrot.at", "Martin", "Zwicklhuber")
      , new Desk(this.target.id));

    this.http.post("https://desksharing.onrender.com/reservation", request, {headers}).subscribe(
    //this.http.post("http://localhost:8090/reservation", request, {headers}).subscribe(
      response => {
        console.log(response)
      }
    )
    return null;
  }
}
