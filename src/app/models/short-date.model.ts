import { WeekDay } from '@angular/common';

export class ShortDate {
  get day() {
    return this.date.getDate();
  }

  get month() {
    return this.date.getMonth();
  }

  get year() {
    return this.date.getFullYear();
  }

  private date: Date;

  private _dateNow = null;
  private get dateNow(): Date {
    if (this._dateNow == null) this._dateNow = new Date();

    return this._dateNow;
  }

  constructor(d: number = null, m: number = null, y: number = null) {
    var da = d, mo = m, yr = y;

    if (da == null) da = this.dateNow.getDate();
    if (mo == null) mo = this.dateNow.getMonth();
    if (yr == null) yr = this.dateNow.getFullYear();

    this.date = new Date(yr, mo, da)
  }

  getWeekday(): number {
    return this.date.getDay();
  }

  getWeekdayName(): string {
    return WeekDay[this.date.getDay()];
  }

  getMonthName(): string {
    return Months[this.month];
  }

  isSameAs(otherDate: ShortDate): boolean {
    if (otherDate == undefined) return false;
    if (this.day.valueOf() == otherDate.day.valueOf() && this.month.valueOf() == otherDate.month.valueOf() && this.year.valueOf() == otherDate.year.valueOf()) return true;
    else return false;
  }

  isBiggerThan(otherDate: ShortDate): boolean {
    if (otherDate == undefined) return true;
    if (
      this.year > otherDate.year
      || (this.year == otherDate.year && this.month > otherDate.month)
      || (this.year == otherDate.year && this.month == otherDate.month && this.day > otherDate.day)
    ) return true;
    else return false
  }

  static FromDate(date: Date): ShortDate {
    return new ShortDate(date.getDate(), date.getMonth(), date.getFullYear())
  }

  toString(): string {
    return this.day + "." + (this.month + 1) + "." + this.year;
  }
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
