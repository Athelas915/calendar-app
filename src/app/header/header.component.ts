import { Component } from '@angular/core';
import { CurrentMonthService } from '../services/current-month.service';
import { ShortDate } from '../models/short-date.model';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  private currentMonthService: CurrentMonthService;

  get currentMonth() {
    return this.currentMonthService.month;
  }
  get currentYear() {
    return this.currentMonthService.year;
  }
  
  monthSelect: number;
  yearSelect: number;

  get currentMonthName() { return this.currentMonthService.currentMonthName }

  readonly monthList: string[];

  constructor(currentMonthService: CurrentMonthService) {
    this.currentMonthService = currentMonthService;

    this.monthSelect = this.currentMonth;
    this.yearSelect = this.currentYear;

    this.monthList = monthList();

    this.env = environment.production;
  }
  private env: boolean;
  private defaultSrc: string = "assets/images/arrow-";
  private prodSrc: string = "/angular/dist/calendar-app/";

  get rightArrow(): string {
    if (this.env) {
      return this.prodSrc + this.defaultSrc + "right.png";
    }
    else {
      return this.defaultSrc + "right.png";
    }
  }
  get leftArrow(): string {
    if (this.env) {
      return this.prodSrc + this.defaultSrc + "left.png";
    }
    else {
      return this.defaultSrc + "left.png";
    }
  }

  private goTo(mo: number, yr: number) {
    this.currentMonthService.update(mo, yr); 
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
    return typeof (value) === "string";
  });
  var months = vals.map(function (value): string {
    return String(value);
  });
  return months;
}

export enum Months {
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
