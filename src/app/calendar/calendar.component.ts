import { Component, OnInit } from '@angular/core';
import { WeekDay } from '@angular/common';
import { Session } from '../models/session.model'
import { CurrentMonthService } from '../services/current-month.service';
import { ShortDate } from '../models/short-date.model';
import { SessionsService } from '../services/sessions.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.sass']
})
export class CalendarComponent implements OnInit {
  currentMonthService: CurrentMonthService;
  sessionsService: SessionsService;

  private get month(): number {
    return this.currentMonthService.month;
  }
  private get year(): number {
    return this.currentMonthService.year;
  }

  weekKeys: number[];
  dayKeys: number[];
  weekdays: string[];


  constructor(currentMonthService: CurrentMonthService, sessionsService: SessionsService) {
    this.currentMonthService = currentMonthService;
    this.sessionsService = sessionsService;

    this.weekKeys = [...Array(currentMonthService.weeksInMonth).keys()];
    this.dayKeys = [...Array(7).keys()];  

    this.weekdays = [];
    for (var i = 1; i < 8; i++) {
      this.weekdays.push(WeekDay[i % 7])
    }
  }

  ngOnInit(): void {
    this.currentMonthService.monthUpdated.subscribe(
      () => {
        this.weekKeys = [...Array(this.currentMonthService.weeksInMonth).keys()]
      }
    );
  }


  private getDate(i: number, j: number): ShortDate {
    var first = new ShortDate(1, this.month, this.year)
    if (i in this.weekKeys && j in this.dayKeys) {
      return new ShortDate(i * 7 + j - ((first.getWeekday() + 6) % 7) + 1, this.month, this.year)
    }
    else return null;
  }

  getData(i: number, j: number): DateAndState {
    var today = new ShortDate();
    var date = this.getDate(i, j);
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
}

export type DateAndState = {
  date: ShortDate;
  sessions: Session[]
  active: boolean;
  clickable: boolean;
}

