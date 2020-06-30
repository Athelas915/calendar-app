import { Component, OnInit } from '@angular/core';
import { SessionsService } from '../services/sessions.service';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.sass']
})
export class SessionsComponent implements OnInit {
  sessionsService: SessionsService

  get date() {
    return this.sessionsService.popup;
  }

  get sessions() {
    return this.sessionsService.getSessionsOnDay(this.date);
  }

  constructor(sessionsService: SessionsService) {
    this.sessionsService = sessionsService;
    
  }
  private _page: number = 0;
  get page(): number {
    return this._page;
  }
  set page(value: number) {
    if (value < 0) this._page = 0;
    else if (value >= this.sessions.length / 6) this._page = Math.floor(this.sessions.length / 6);
    else this._page = value;
  }

  get pageKeys() {
    var lastPage = Math.floor(this.sessions.length / 6);
    var pagesToSelect = 7;
    if (this.sessions.length < pagesToSelect + 1) {
      return [...Array(lastPage).keys()];
    }
    else {
      var result = [...Array(pagesToSelect).keys()];
      if (this.page < Math.floor(pagesToSelect / 2)) result[pagesToSelect - 1] = lastPage;
      else if (this.page > lastPage - Math.floor(pagesToSelect / 2)) {
        for (var i = 0; i < result.length; i++) {
          result[i] += (lastPage - pagesToSelect + 1);
        }
        result[0] = 0;
      }
      else {
        for (var i = 0; i < result.length; i++) {
          result[i] += this.page - Math.floor(pagesToSelect / 2);
        }
        result[0] = 0;
        result[pagesToSelect - 1] = lastPage;
      }
      return result;
    }
  }
  keys: number[] = [...Array(6).keys()];

  ngOnInit(): void {
  }

  goBack(): void {
    this.sessionsService.popup = null;
  }

  sendChange(id: number): void {
    this.sessionsService.sendChangeRequest(id);
  }

  setPage(i: number): void {
    this.page = i;
  }

  pageUp(): void {
    this.page++;
  }

  pageDown(): void {
    this.page--;
  }

  isCurrentPage(i: number): string {
    if (this.page == i) return "this-page";
    else return "";
  }
}
