import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { Session } from '../../models/session.model';
import { WeekDay, Time } from '@angular/common';
import { Months } from '../../header/header.component';

@Component({
  selector: 'app-single-session',
  templateUrl: './single-session.component.html',
  styleUrls: ['./single-session.component.sass']
})
export class SingleSessionComponent implements OnChanges {
  @Input("session") session: Session;
  @Output("enroll") id = new EventEmitter<number>();
  isEnrolled: boolean = false;

  constructor() { }

  ngOnChanges(): void {
    this.isEnrolled = false;
  }

  toShortDateString(date: Date): string {
    var result = "";
    result += WeekDay[date.getDay()] + ", ";

    var day: number = date.getDate();
    var ord: string;
    if (day % 10 == 1 && day != 11) ord = "st";
    else if (day % 10 == 2 && day != 12) ord = "nd"
    else if (day % 10 == 3 && day != 13) ord = "rd"
    else ord = "th";

    result += day + ord + " of ";
    result += Months[date.getMonth()] + " ";
    result += date.getFullYear();

    return result;
  }

  toStartTimeString(time: Time) {
    var ho;
    var min;

    if (time.hours >= 10) ho = time.hours;
    else ho = "0" + time.hours;
    if (time.minutes >= 10) min = time.minutes;
    else min = "0" + time.minutes;

    return ho + ":" + min;
  }

  toDurationString(time: Time) {
    var ho;
    var min;

    if (time.hours == 1) ho = time.hours + " hour ";
    else ho = time.hours + " hours, ";
    if (time.minutes == 0) min = ""
    else if (time.minutes == 1) min = time.minutes + " minute";
    else min = time.minutes + " minutes"

    return ho + min;
  }

  enroll() {
    this.id.emit(this.session.id)
    this.isEnrolled = true;
  }
}
