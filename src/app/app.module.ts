import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { HeaderComponent } from './header/header.component';
import { DayComponent } from './calendar/day/day.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CurrentMonthService } from './services/current-month.service';
import { SessionCountService } from './services/session-count.service';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    HeaderComponent,
    DayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    HttpClient,
    CurrentMonthService,
    SessionCountService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
