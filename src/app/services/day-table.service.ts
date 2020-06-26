import { Injectable } from '@angular/core';
import { ShortDate } from '../models/short-date.model';

@Injectable({
  providedIn: 'root'
})
export class DayTableService {
  month: number;
  year: number;

  first: ShortDate;

  weekKeys: number[];
  dayKeys: number[];

  constructor() {
    var date = new ShortDate(1)
    this.first = date;
    this.month = date.month;
    this.year = date.year;
    this.weekKeys = [...Array(fullWeeks(date.month, date.year)).keys()];
    this.dayKeys = [...Array(7).keys()];  
  }

  update(mo: number, yr: number): void {
    this.first = new ShortDate(1, mo, yr);

    this.month = this.first.month;
    this.year = this.first.year;
    this.weekKeys = [...Array(fullWeeks(this.first.month, this.first.year)).keys()];
    this.dayKeys = [...Array(7).keys()];
  }

  getDate(i: number, j: number): ShortDate {
    if (i in this.weekKeys && j in this.dayKeys) {
      return new ShortDate(i * 7 + j - ((this.first.getWeekday() + 6) % 7) + 1, this.month, this.year)
    }
    else return null;
  }
}


function daysInMonth(mo: number, yr: number): number {
  var prvMo = new Date(yr, mo + 1, 0);
  return prvMo.getDate();
}

function fullWeeks(mo, yr) {
  var date = new Date(yr, mo, 1);
  var days = daysInMonth(mo, yr);
  return Math.ceil((days + (date.getDay() + 6) % 7) / 7)
}
