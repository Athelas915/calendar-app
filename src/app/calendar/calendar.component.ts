import { Component, Input } from '@angular/core';
import { WeekDay } from '@angular/common';
import { Session } from '../models/session.model'
import { DayTableService } from '../services/day-table.service';
import { ShortDate } from '../models/short-date.model';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.sass']
})
export class CalendarComponent {
  dayTableService: DayTableService;

  private get month(): number {
    return this.dayTableService.month;
  }
  private get year(): number {
    return this.dayTableService.year;
  }

  weekdays: string[];

  get weeksIt() {
    return this.dayTableService.weekKeys;
  }
  get daysIt() {
    return this.dayTableService.dayKeys;
  }

  constructor(dayTableService: DayTableService) {
    this.weekdays = [];
    for (var i = 1; i < 8; i++) {
      this.weekdays.push(WeekDay[i % 7])
    }
    this.dayTableService = dayTableService;
  }

  getDate(i: number, j: number): DateAndActive {
    var result = this.dayTableService.getDate(i, j);
    return { date: result, active: result.month == this.month };
  }
}

export type DateAndActive = {
  date: ShortDate;
  active: boolean;
}
