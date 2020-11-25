import { Component, OnInit } from '@angular/core';
import { WeekDay } from '@angular/common';
import { CurrentMonthService } from '../services/current-month.service';
import { ShortDate } from '../models/short-date.model';
import { SessionsOnDay } from '../models/sessions-on-day.model';
import { SessionCountService } from '../services/session-count.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  private currentMonthService: CurrentMonthService;
  private sessionCountService: SessionCountService;

  private get month(): number {
    return this.currentMonthService.month;
  }
  private get year(): number {
    return this.currentMonthService.year;
  }

  weekKeys: number[];
  dayKeys: number[];
  weekdays: string[];


  constructor(currentMonthService: CurrentMonthService, sessionCountService: SessionCountService) {
    this.currentMonthService = currentMonthService;
    this.sessionCountService = sessionCountService;

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

  getData(i: number, j: number) {
    var today = new ShortDate();
    var date = this.getDate(i, j);
    var isCurrentMonth = date.month == this.month;

    return {
      date: date,
      currentMonth: isCurrentMonth,
    };
  }
}


export type DateAndState = {
  date: ShortDate;
  currentMonth: boolean;
}

