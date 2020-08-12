import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { Session } from '../../models/session.model';
import { SessionsService } from '../../services/sessions.service';
import { ShortDate } from '../../models/short-date.model';
import { DateAndState } from '../calendar.component';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.sass']
})
export class DayComponent implements OnChanges {
  private sessionService: SessionsService;
  @Input('data') input: DateAndState;

  get date(): ShortDate {
    return this.input.date;
  }
  get active(): boolean {
    return this.input.active;
  }
  get clickable(): boolean {
    return this.input.clickable;
  }
  get sessions(): Session[] {
    return this.input.sessions;
  }

  uniqueTypes: string[];

  constructor(sessionService: SessionsService) {
    this.input = { date: new ShortDate(), active: false, clickable: false, sessions: [] }
    this.sessionService = sessionService;
  }

  ngOnChanges(): void {
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
    if (this.clickable) classClickable = "clickable";
    else classClickable = "unclickable";

    return classActive + ' ' + classClickable + ' ' + today;
  }

  onClick() {
    //Implement popup window
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
