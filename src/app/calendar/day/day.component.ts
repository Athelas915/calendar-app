import { Component, OnChanges, Input } from '@angular/core';
import { Session } from '../../models/session.model';
import { SessionsService } from '../../services/sessions.service';
import { ShortDate } from '../../models/short-date.model';
import { DateAndActive } from '../calendar.component';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.sass']
})
export class DayComponent implements OnChanges {
  private sessionService: SessionsService;
  @Input('date-and-active') input: DateAndActive;

  get date(): ShortDate {
    return this.input.date;
  }
  get active(): boolean {
    return this.input.active;
  }

  sessions: Session[] = [];

  uniqueTypes: string[];

  constructor(sessionsService: SessionsService) {
    this.sessionService = sessionsService;
    this.input = { date: new ShortDate(), active: false }
  }

  ngOnChanges(): void {
    this.sessions = this.sessionService.getSessionsOnDay(this.date);
    this.uniqueTypes = getUniqueTypes(this.sessions);
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
    if (this.active && this.sessions.length > 0) classClickable = "clickable";
    else classClickable = "unclickable";

    return classActive + ' ' + classClickable + ' ' + today;
  }

  onClick() {
    this.sessionService.popup = this.date;
  }
}

function getUniqueTypes(sessions: Session[]): string[] {
  var result = [];

  for (let se of sessions) {
    if (!result.includes(" " + se.type)) {
      result.push(" " + se.type);
    }
  }

  if (result.length > 3) {
    while (result.length > 3) {
      result.pop();
    }
    result[result.length - 1] += "...";
  }
  return result;
}
