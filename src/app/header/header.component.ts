import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit, OnChanges {
  @Input("month") currentMonth: number;
  @Input("year") currentYear: number;
  @Output() dataChanged = new EventEmitter<Data>();

  curMonthName: string;
  monthList: string[];
  monthSelect: number;
  yearSelect: number;

  constructor() {
    this.monthList = monthList();
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.curMonthName = getMonthName(this.currentMonth);
    this.monthSelect = this.currentMonth;
    this.yearSelect = this.currentYear;
  }

  changeData(newMonth, newYear) {
    var mo = mod(newMonth, 12);
    var yr = newYear;
    var result: Data = {
      month: mo,
      year: yr
    }
    this.dataChanged.emit(result);
  }

  goNextMonth() {
    var mo: number, yr: number;

    if (this.currentMonth == 11) {
      yr = this.currentYear + 1;
    }
    else {
      yr = this.currentYear;
    }
    mo = this.currentMonth + 1;
    this.changeData(mo, yr);
  }

  goPreviousMonth() {
    var mo: number, yr: number;

    if (this.currentMonth == 0) {
      yr = this.currentYear - 1;
    }
    else {
      yr = this.currentYear;
    }
    mo = this.currentMonth - 1;
    this.changeData(mo, yr);
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


export interface Data {
  year: number;
  month: number;
}
