import { Injectable } from '@angular/core';
import { SessionsOnDay } from '../models/sessions-on-day.model';
import { ShortDate } from '../models/short-date.model';

@Injectable({
  providedIn: 'root'
})
export class SessionCountService {
  private sessions: SessionsOnDay[];

  constructor() {
    this.sessions = MockData(); //this should call the server for data
  }

  getSessionsOnDay(date: ShortDate): SessionsOnDay {
    function DateHasSessions(el: SessionsOnDay): boolean {
      return el.Date.isSameAs(date);
    }
    var se = this.sessions.find(DateHasSessions);

    if (se === undefined) return new SessionsOnDay(date, 0, []);
    else return se;
  }

  sendDate(date: ShortDate): void {
    //Implement sending the date back to the server
  }
}


function MockData(): SessionsOnDay[] {
  var today = new ShortDate();
  
  var data = [
    new SessionsOnDay(today, 4, ["Pilates", "Yoga", "Spinning", "Boxing"]),
    new SessionsOnDay(new ShortDate(today.day + 1), 3, ["Pilates"]),
    new SessionsOnDay(new ShortDate(today.day + 2), 5, ["Yoga", "Spinning", "Boxing"])
  ];

  return data;
}
