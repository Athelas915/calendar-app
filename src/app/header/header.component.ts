import { Component } from '@angular/core';
import { DayTableService } from '../services/day-table.service';
import { ShortDate } from '../models/short-date.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent {
  private dayTableService: DayTableService;

  get currentMonth() {
    return this.dayTableService.month;
  }
  set currentMonth(value: number) {
    this.dayTableService.month = value;
    this.curMonthName = getMonthName(this.currentMonth);
  }
  get currentYear() {
    return this.dayTableService.year;
  }
  set currentYear(value: number) {
    this.dayTableService.year = value;  
  }
  
  monthSelect: number;
  yearSelect: number;
  curMonthName: string;
  monthList: string[];

  constructor(dayTableService: DayTableService) {
    this.dayTableService = dayTableService;

    this.monthSelect = this.currentMonth;
    this.curMonthName = getMonthName(this.currentMonth);
    this.yearSelect = this.currentYear;

    this.monthList = monthList();
  }

  goNextMonth() {
    this.currentMonth += 1;
    this.currentYear = this.currentYear;

    this.monthSelect = this.currentMonth;
    this.yearSelect = this.currentYear;
  }

  goPreviousMonth() {
    this.currentMonth -= 1;
    this.currentYear = this.currentYear;

    this.monthSelect = this.currentMonth;
    this.yearSelect = this.currentYear;
  }
  goToDate() {
    this.currentMonth = this.monthSelect;
    this.currentYear = this.yearSelect;

    this.monthSelect = this.currentMonth;
    this.yearSelect = this.currentYear;
  }

  goToCurrent() {
    var date = new ShortDate();
    this.currentMonth = date.month;
    this.currentYear = date.year;

    this.monthSelect = this.currentMonth;
    this.yearSelect = this.currentYear;
  }
}

function monthList(): string[] {
  var vals = Object.values(Months).filter(function (value): boolean {
    return typeof (value) == "string";
  });
  var months = vals.map(function (value): string {
    return String(value);
  });
  return months;
}

function getMonthName(no: number): string {
  return Months[no];
}

function mod(n, m) {
  return ((n % m) + m) % m;
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


export type Data = {
  year: number;
  month: number;
}
