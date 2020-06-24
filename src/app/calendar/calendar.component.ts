import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { WeekDay } from '@angular/common';
import { Session } from '../models/session.model'

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.sass']
})
export class CalendarComponent implements OnInit, OnChanges {

  @Input('month') month: number;
  @Input('year') year: number;
  @Input('sessions') sessions: Session[];

  weekdays: string[];

  data: sessionData[][];

  constructor() {
  }

  ngOnInit(): void {
    this.weekdays = weekdayList();
  }

  ngOnChanges(): void {
    this.data = fillData(this.month, this.year, this.sessions);
  }
}

type sessionData = {
  day: number;
  active: boolean;
  sessions: Session[];
}

function fillData(mo: number, yr: number, sess: Session[]): sessionData[][] {
  var noOfWeeks = fullWeeksInMonth(mo, yr);
  var firstDay = (new Date(yr, mo, 1)).getDay() - 1;
  if (firstDay < 0) firstDay += 7;
  var prvMoDayCount = daysInMonth(mo - 1, yr)

  var result: sessionData[][] = [...Array(noOfWeeks)].map(x => Array(7).fill(null));
  var sessOrd = orderSession(sess);

  var currMoDay = 0;
  var nextMoDay = 0;
  var seIndex = 0;

  for (var i = 0; i < result.length; i++) {
    for (var j = 0; j < result[0].length; j++) {
      result[i][j] = {
        day: 0,
        active: false,
        sessions: []
      }
      if (i == 0) {
        if (j < firstDay) {
          result[i][j].day = prvMoDayCount - (firstDay - j - 1);
          result[i][j].active = false;
        }
        else {
          result[i][j].day = ++currMoDay;
          result[i][j].active = true;
          while (dateMatches(yr, mo, currMoDay, sessOrd[seIndex])) {
            result[i][j].sessions.push(sessOrd[seIndex++]);
          }
        }
      }
      else if (currMoDay < daysInMonth(mo, yr)) {
        result[i][j].day = ++currMoDay;
        result[i][j].active = true;
        while (dateMatches(yr, mo, currMoDay, sessOrd[seIndex])) {
          result[i][j].sessions.push(sessOrd[seIndex++]);
        }
      }
      else {
        result[i][j].day = ++nextMoDay;
        }
      }
  }
  return result;
}


function orderSession(sess: Session[]): Session[] {
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

function dateMatches(year: number, month: number, day: number, se: Session): boolean {
  if (typeof (se) == 'undefined') return false
  else if (se.date.getDate() == day && se.date.getMonth() == month && se.date.getFullYear() == year) return true;
  else return false;
}


//potentially to delete


function fillSessions(days: number[][], act: boolean[][], ses: Session[], month: number, year: number): Session[][][] {
  if (typeof (days) == 'undefined') return;
  var m = days.length;
  var n = days[0].length;
  var dates = getDates(ses);
  var result: (Session[] | null)[][] = [...Array(m)].map(x => [...Array(n)].fill(null));
  for (var i = 0; i < m; i++) {
    for (var j = 0; j < n; j++) {
      var iid = isInDates({ day: days[i][j], month: month, year: year }, dates)
      if (act[i][j] && iid != null) {
        result[i][j] = [];
        for (let k of dates[iid].indexes) {
          result[i][j].push(ses[k]);
        }
      }
      else {
        result[i][j] = [];
      }
    }
  }

  return;
}

function isInDates(date: DateShort, dateList: DateAndIndexes[]): number | null {
  for (var i = 0; dateList.length; i++) {
    if (datesAreSame(date, dateList[i].date)) return i;
    else return null;
  }
}

type DateAndIndexes = {
  date: DateShort;
  indexes: number[];
}

type SessionWIndex = {
  session: Session;
  index: number;
}

function getDates(ses: Session[]): DateAndIndexes[] {
  var sesOrd: SessionWIndex[] = [];
  for (var m = 0; m < ses.length; m++) {
    sesOrd.push({ session: ses[m], index: m });
  }
  sesOrd = sesOrd.sort(compareSesWInd)

  var result: DateAndIndexes[] = [];
  var i = 0;
  for (let s of sesOrd) {
    var dateTemp = getDateShort(s.session);
    if (result.length == 0) result.push({ date: dateTemp, indexes: [s.index] });
    else if (datesAreSame(result[i].date, dateTemp)) {
      result[i].indexes.push(s.index);
    }
    else {
      result.push({ date: dateTemp, indexes: [s.index] });
      i++;
    }
  }
  return result;
}
type DateShort = {
  day: number;
  month: number;
  year: number;
}
function getDateShort(session: Session): DateShort {
  return {
    day: session.date.getDate(),
    month: session.date.getMonth(),
    year: session.date.getFullYear()
  };
}

function compareSesWInd(a: SessionWIndex, b: SessionWIndex) {
  if (a.session.date < b.session.date) return -1;
  else if (a.session.date > b.session.date) return 1;
  else return 0;
}
function datesAreSame(date1: DateShort, date2: DateShort): boolean {
  if (date1.day == date2.day && date1.month == date2.month && date1.year == date2.year) return true;
  else return false;
}

function flagInactive(arr: number[][]): boolean[][] {
  var result = [...Array(arr.length)].map(x => Array(arr[0].length).fill(true))

  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr[0].length; j++) {
      if ((i == 0 && arr[i][j] > 7) || (i == arr.length - 1 && arr[i][j] < 7)) result[i][j] = false;
      else result[i][j] = true;
    }
  }
  return result;
}

function fillDays(mo: number, yr: number): number[][] {
  var noOfWeeks = fullWeeksInMonth(mo, yr);
  var result = [...Array(noOfWeeks)].map(x => Array(7).fill(0));
  var firstDay = (new Date(yr, mo, 1)).getDay() - 1;
  if (firstDay < 0) firstDay += 7;
  var prvMoDayCount = daysInMonth(mo - 1, yr)

  var result = [...Array(noOfWeeks)].map(x => Array(7).fill(0));

  var m = 0;
  var n = 0;
  for (var i = 0; i < noOfWeeks; i++) {
    for (var j = 0; j < 7; j++) {
      if (i == 0) {
        if (j < firstDay) result[i][j] = prvMoDayCount - (firstDay - j - 1);
        else result[i][j] = ++m;
      }
      else if (m < daysInMonth(mo, yr)) {
        result[i][j] = ++m;
      }
      else {
        result[i][j] = ++n;
      }
    }
  }

  return result;
}
//potentially to delete




function weekdayList(): string[] {
  var vals = Object.values(WeekDay).filter(function (value): boolean {
    return typeof (value) == "string";
  });
  var weekdays = vals.map(function (value): string {
    return String(value);
  });
  weekdays[weekdays.length - 1] = weekdays.shift();
  return weekdays;
}

function fullWeeksInMonth(mo: number, yr: number): number {

  var baseDate = new Date(yr, mo, 1);
  var daysInFirstWeek = 8 - baseDate.getDay();
  if (daysInFirstWeek == 8) daysInFirstWeek -= 7;

  var remainingDays = daysInMonth(mo, yr) - daysInFirstWeek;
  if (remainingDays % 7 == 0) return (remainingDays - remainingDays % 7) / 7 + 1
  else return (remainingDays - remainingDays % 7)/7 + 2
}

function daysInMonth(mo: number, yr: number): number {
  var prvMo = new Date(yr, mo + 1, 0);
  return prvMo.getDate();
}
