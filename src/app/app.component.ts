import { Component, OnInit } from '@angular/core';
import { Data } from './header/header.component'
import { Session } from './models/session.model'
import { SessionsService } from './services/sessions.service';
import { DayTableService } from './services/day-table.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  private dayTableService: DayTableService;

  title = 'Fitness Club Calendar';
  sessions: Session[];

  get month() {
    return this.dayTableService.month;
  }
  get year() {
    return this.dayTableService.year;
  }

  constructor(sessionsService: SessionsService, dayTableService: DayTableService) {
    this.dayTableService = dayTableService;
    this.sessions = sessionsService.sessions;
  }

  ngOnInit() {
  }
}
