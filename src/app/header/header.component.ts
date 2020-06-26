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
  get currentYear() {
    return this.dayTableService.year;
  }
  
  monthSelect: number;
  yearSelect: number;
  curMonthName: string;
  monthList: string[];

  constructor(dayTableService: DayTableService) {
    this.dayTableService = dayTableService;

    this.monthSelect = this.currentMonth;
    this.curMonthName = Months[this.currentMonth];
    this.yearSelect = this.currentYear;

    this.monthList = monthList();
  }

  private goTo(mo: number, yr: number) {
    this.dayTableService.update(mo, yr);
    this.curMonthName = Months[this.currentMonth]     
    this.monthSelect = this.currentMonth;
    this.yearSelect = yr;
  }

  goNextMonth() {
    var mo = this.currentMonth + 1;
    var yr = this.currentYear;
    this.goTo(mo, yr);
  }

  goPreviousMonth() {
    var mo = this.currentMonth - 1;
    var yr = this.currentYear;
    this.goTo(mo, yr);
  }
  goToDate() {
    var mo = this.monthSelect;
    var yr = this.yearSelect;
    this.goTo(mo, yr);
  }

  goToCurrent() {
    var date = new ShortDate();
    var mo = date.month;
    var yr = date.year;
    this.goTo(mo, yr);
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
