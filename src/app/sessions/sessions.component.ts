import { Component, OnInit } from '@angular/core';
import { SessionsService } from '../services/sessions.service';
import { ShortDate } from '../models/short-date.model';
import { Session } from '../models/session.model';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.sass']
})
export class SessionsComponent implements OnInit {
  private sessionsService: SessionsService

  get date() {
    return this.sessionsService.popup;
  }

  get sessions() {
    return this.sessionsService.getSessionsOnDay(this.date);
  }

  constructor(sessionsService: SessionsService) {
    this.sessionsService = sessionsService;
    
  }

  ngOnInit(): void {
  }

  goBack(): void {
    this.sessionsService.popup = null;
  }

  sendEnrollment(id: number): void {
    this.sessionsService.enrollment = id;
  }
}
