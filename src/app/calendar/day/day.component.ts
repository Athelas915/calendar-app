import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { ShortDate } from '../../models/short-date.model';
import { DateAndState } from '../calendar.component';
import { SessionCountService } from '../../services/session-count.service';
import { SessionsOnDay } from '../../models/sessions-on-day.model';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.sass']
})
export class DayComponent implements OnChanges {
  private sessionCountService: SessionCountService;
  private today: ShortDate;

  @Input('data') input: DateAndState;

  get active(): boolean {
    if (!this.today.isBiggerThan(this.date) && this.input.currentMonth) return true;
    else return false;
  }
  get clickable(): boolean {
    if (this.sessionCount > 0 && this.input.currentMonth) return true;
    else return false;
  }
  get date(): ShortDate {
    return this.input.date;
  }
  get sessionCount(): number {
    return this.sessionData.SessionCount;
  }
  get uniqueTypes(): string {
    return formatString(this.sessionData.SessionTypes);
  }

  private sessionData: SessionsOnDay;

  constructor(sessionCountService: SessionCountService) {
    this.sessionCountService = sessionCountService;
    this.today = new ShortDate();
  }

  ngOnChanges(): void {
    this.sessionData = this.sessionCountService.getSessionsOnDay(this.date);
  }

  
  isClickableAndActive(): string {
    var now = new ShortDate();

    var today: string;
    if (now.isSameAs(this.date)) today = "today";
    else today = "";


    var classActive: string;
    if (!now.isBiggerThan(this.date) && this.active) classActive = "active";
    else classActive = "inactive";

    var classClickable: string;
    if (this.clickable) classClickable = "clickable";
    else classClickable = "unclickable";

    return classActive + ' ' + classClickable + ' ' + today;
  }

  onClick() {
    this.sessionCountService.sendDate(this.date);
  }
}


function formatString(sessions: string[]): string {
  var result = [];

  for (let type of sessions) {
    if (!result.includes(" " + type)) {
      result.push(" " + type);
    }
  }

  if (result.length > 3) {
    while (result.length > 3) {
      result.pop();
    }
    result[result.length - 1] += "...";
  }
  return result.join(", ");
}
