import { WeekDay } from '@angular/common';

export class ShortDate {
  day: number;
  month: number;
  year: number;

  private _date: Date = null;
  private get date(): Date {
    if (this._date == null) this._date = new Date(this.year, this.month, this.day)
    return this._date;
  }

  constructor(d: number = null, m: number = null, y: number = null) {
    var dCount = daysInMonth(m, y);
    var moff = 0;
    var yoff = 0;
    if (d == null && m == null && y == null) {
      this._date = new Date();
      this.day = this.date.getDate();
      this.month = this.date.getMonth();
      this.year = this.date.getFullYear();
    }
    else {
      if (d == null) this.day = 1;
      else if (d > dCount) {
        this.day = d % dCount;
        moff = (d - d % dCount) / dCount;
      }
      else if (d < 0) {
        this.day = d;
        while (this.day < 0) {
          this.day += dCount;
          moff -= 1;
        }
      }
      else this.day = d;

      if (m == null) this.month = moff;
      else this.month = m + moff;
      while (this.month < 0) {
        this.month += 12;
        yoff -= 1;
      }
      while (this.month > 11) {
        this.month -= 12;
        yoff += 1;
      }
      if (y == null) this.year = 1 + yoff;
      else this.year = y + yoff;
    }
  }

  getWeekdayName(): string {
    return WeekDay[this.date.getDay()];
  }

  getMonthName(): string {
    return Months[this.month];
  }

  isSameAs(otherDate: ShortDate): boolean {
    if (this.day.valueOf() == otherDate.day.valueOf() && this.month.valueOf() == otherDate.month.valueOf() && this.year.valueOf() == otherDate.year.valueOf()) return true;
    else return false;
  }

  static FromDate(date: Date): ShortDate {
    return new ShortDate(date.getDate(), date.getMonth(), date.getFullYear())
  }

  toString(): string {
    return this.day + "." + (this.month + 1) + "." + this.year;
  }
}

function daysInMonth(mo: number, yr: number): number {
  var prvMo = new Date(yr, mo + 1, 0);
  return prvMo.getDate();
}

enum Months {
  January = 0,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  December
}
