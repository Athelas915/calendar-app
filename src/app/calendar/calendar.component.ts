import { Component, Input } from '@angular/core';
import { WeekDay } from '@angular/common';
import { Session } from '../models/session.model'
import { DayTableService } from '../services/day-table.service';
import { ShortDate } from '../models/short-date.model';
import { SessionsService } from '../services/sessions.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.sass']
})
export class CalendarComponent {
  dayTableService: DayTableService;
  sessionsService: SessionsService;

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

  constructor(dayTableService: DayTableService, sessionsService: SessionsService) {
    this.weekdays = [];
    for (var i = 1; i < 8; i++) {
      this.weekdays.push(WeekDay[i % 7])
    }
    this.dayTableService = dayTableService;
    this.sessionsService = sessionsService;
  }

  getData(i: number, j: number): DateAndState {
    var today = new ShortDate();
    var date = this.dayTableService.getDate(i, j);
    var sessions = this.sessionsService.getSessionsOnDay(date);
    var isCurrentMonth = date.month == this.month;

    var active: boolean;
    if (!today.isBiggerThan(date) && isCurrentMonth) active = true;
    else active = false;

    var clickable: boolean;
    if (sessions.length > 0 && isCurrentMonth) clickable = true;
    else clickable = false;

    return {
      date: date,
      active: active,
      clickable: clickable,
      sessions: sessions
    };
  }

  showPopup(date: ShortDate) {
    this.sessionsService.popup = date;
  }
}

export type DateAndState = {
  date: ShortDate;
  sessions: Session[]
  active: boolean;
  clickable: boolean;
}
