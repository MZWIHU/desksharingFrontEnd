export class User {
  public userID;

  public mail;

  public name;

  public surname;

  constructor(userID: string, mail : string, name: string, surname: string) {
    this.userID = userID;
    this.mail = mail;
    this.name = name;
    this.surname = surname;
  }
}
