import { User } from './User';
import {Desk} from "./Desk";
export class Reservation {
  constructor(fromTime: string, toTime: string, user : User, desk: Desk) {
    this.fromTime = fromTime;
    this.toTime = toTime;
    this.user = user;
    this.desk = desk;
  }


  public fromTime;

  public toTime;

  public user : User;

  public desk : Desk;

}

