import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { HeaderComponent } from './header/header.component';
import { DayComponent } from './calendar/day/day.component';
import { SessionsComponent } from './sessions/sessions.component';
import { SessionsService } from './services/sessions.service';
import { SingleSessionComponent } from './sessions/single/single-session.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    HeaderComponent,
    DayComponent,
    SessionsComponent,
    SingleSessionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    SessionsService,
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
