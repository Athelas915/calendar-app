import { Injectable, EventEmitter } from '@angular/core';
import { ShortDate } from '../models/short-date.model';

@Injectable({
  providedIn: 'root'
})
export class CurrentMonthService {
  private date: ShortDate;
  readonly monthUpdated: EventEmitter<void>;

  constructor() {
    this.date = new ShortDate();
    this.monthUpdated = new EventEmitter();
  }

  get month(): number { return this.date.month; }
  get year(): number { return this.date.year; }
  get currentMonthName(): string { return this.date.getMonthName() }
  get weeksInMonth(): number { return fullWeeks(this.month, this.year) }

  update(mo: number, yr: number): void {
    this.date = new ShortDate(1, mo, yr);
    this.monthUpdated.emit();
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
