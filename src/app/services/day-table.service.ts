import { Injectable } from '@angular/core';
import { ShortDate } from '../models/short-date.model';

@Injectable({
  providedIn: 'root'
})
export class DayTableService {
  private _year: number;
  get year() {
    return this._year;
  }
  set year(value: number) {
    if (value > 9999) {
      this._year = 9999;
      this.month = 11;
    }
    else if (value < 1000) {
      this._year = 1000;
      this.month = 0;
    }
    else this._year = value;
  }

  private _month: number;
  get month() {
    return this._month;
  }
  set month(value: number) {
    var result = realMod(value, 12)
    this._month = result;
    this.year += (value - result) / 12;
  }

  constructor() {
    var date = new ShortDate();
    this.year = date.year;
    this.month = date.month;
  }
}

function realMod(n, m) {
  return ((n % m) + m) % m;
}
