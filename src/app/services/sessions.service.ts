import { Injectable } from '@angular/core';
import { Session } from '../models/session.model';
import { ShortDate } from '../models/short-date.model';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SessionsService {
  datesAndSessions: DateWSessions[];
  sessions: Session[];

  popup: ShortDate = null;

  change: number = -1;

  constructor(private http: HttpClient) {
    var sessions = mockData(5);
    this.sessions = sessions;
    this.datesAndSessions = splitSessions(this.sessions);
  }

  getSessionsOnDay(date: ShortDate): Session[] {
    var result = this.datesAndSessions.find(isOnDate);
    if (typeof (result) == "undefined") return [];
    else return result.sessions;

    function isOnDate(element: DateWSessions) {
      return element.date.isSameAs(date);
    }
  }

  sendChangeRequest(id: number) {
    var se = this.sessions.find(hasId);
    se.isEnrolled = !se.isEnrolled;
    function hasId(element) {
      if (element.id == id) return true;
      else return false;
    }
  }
}


function splitSessions(sessions: Session[]): DateWSessions[] {
  var seOrd: Session[] = orderSessions(sessions);
  var m = 0;

  var result: DateWSessions[] = [];
  
  for (let se of seOrd) {
    var tempDate = ShortDate.FromDate(se.date);
    if (result.length == 0) result.push({ date: tempDate, sessions: [se] })
    else if (result[m].date.isSameAs(tempDate)) result[m].sessions.push(se)
    else {
      result.push({ date: tempDate, sessions: [se] });
      m += 1;
    }
  }

  return result;
}


function orderSessions(sess: Session[]): Session[] {
  var result = [];
  for (var m = 0; m < sess.length; m++) {
    result.push(sess[m]);
  }
  result = result.sort(compareSessions);
  return result;

  function compareSessions(a: Session, b: Session) {
    if (a.date < b.date) return -1;
    else if (a.date > b.date) return 1;
    else return 0;
  }
}


type DateWSessions = {
  date: ShortDate;
  sessions: Session[];
}





//testing
function mockData(n: number): Session[] {
  var result = new Array(n);
  var types = ["Pilates", "Yoga", "Spinning"];
  var coaches = ["John Smith", "Alex Turner", "Mike Spears"]
  var today = new Date();
  for (var i = 0; i < n; i++) {
    var session = new Session();
    session.id = i;
    session.type = types[i % types.length];
    session.coach = coaches[i % coaches.length];
    session.room = i * 3 + 1;
    session.date = new Date(today.getFullYear(), (today.getMonth()) % 12, today.getDate() + i % 3);
    session.start = { hours: 8 + i % 9, minutes: 0 }
    session.duration = { hours: 1, minutes: 30 }
    session.isEnrolled = false;

    result[i] = session;
  }

  return result;
}
