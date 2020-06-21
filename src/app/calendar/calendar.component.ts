import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { WeekDay } from '@angular/common';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.sass']
})
export class CalendarComponent implements OnInit, OnChanges {

  @Input('month') month: number;
  @Input('year') year: number;

  days: number[][];
  activeDays: boolean[][];
  weekdays: string[];


  constructor() {
  }

  ngOnInit(): void {
    this.weekdays = weekdayList();
  }

  ngOnChanges(): void {
    this.days = fillDays(this.month, this.year);
    this.activeDays = flagInactive(this.days);
  }
}

function flagInactive(arr: number[][]): boolean[][] {
  var result = [...Array(arr.length)].map(x => Array(arr[0].length).fill(true))

  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr[0].length; j++) {
      if ((i == 0 && arr[i][j] > 7) || (i == arr.length - 1 && arr[i][j] < 7)) result[i][j] = false;
      else result[i][j] = true;
    }
  }
  return result;
}

function weekdayList(): string[] {
  var vals = Object.values(WeekDay).filter(function (value): boolean {
    return typeof (value) == "string";
  });
  var weekdays = vals.map(function (value): string {
    return String(value);
  });
  weekdays[weekdays.length - 1] = weekdays.shift();
  return weekdays;
}

function fillDays(mo: number, yr: number): number[][] {
  var noOfWeeks = fullWeeksInMonth(mo, yr);
  var result = [...Array(noOfWeeks)].map(x => Array(7).fill(0));
  var firstDay = (new Date(yr, mo, 1)).getDay() - 1;
  if (firstDay < 0) firstDay += 7;
  var prvMoDayCount = daysInMonth(mo - 1, yr)

  var result = [...Array(noOfWeeks)].map(x => Array(7).fill(0));

  var m = 0;
  var n = 0;
  for (var i = 0; i < noOfWeeks; i++) {
    for (var j = 0; j < 7; j++) {
      if (i == 0) {
        if (j < firstDay) result[i][j] = prvMoDayCount - (firstDay - j - 1);
        else result[i][j] = ++m;
      }
      else if (m < daysInMonth(mo, yr)) {
        result[i][j] = ++m;
      }
      else {
        result[i][j] = ++n;
      }
    }
  }

  return result;
}


function fullWeeksInMonth(mo: number, yr: number): number {

  var baseDate = new Date(yr, mo, 1);
  var daysInFirstWeek = 8 - baseDate.getDay();
  if (daysInFirstWeek == 8) daysInFirstWeek -= 7;

  var remainingDays = daysInMonth(mo, yr) - daysInFirstWeek;
  if (remainingDays % 7 == 0) return (remainingDays - remainingDays % 7) / 7 + 1
  else return (remainingDays - remainingDays % 7)/7 + 2
}

function daysInMonth(mo: number, yr: number): number {
  var prvMo = new Date(yr, mo + 1, 0);
  return prvMo.getDate();
}
