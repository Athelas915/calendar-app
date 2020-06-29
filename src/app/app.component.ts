import { Component, OnInit } from '@angular/core';
import { Data } from './header/header.component'
import { Session } from './models/session.model'
import { SessionsService } from './services/sessions.service';
import { DayTableService } from './services/day-table.service';
import { ShortDate } from './models/short-date.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  sessionsService: SessionsService;

  title = 'Fitness Club Calendar';

  get popupDate() {
    return this.sessionsService.popup;
  }

  constructor(sessionsService: SessionsService) {
    this.sessionsService = sessionsService;
  }

  ngOnInit() {
  }
}
