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
import { DayTableService } from './services/day-table.service';
import { SingleSessionComponent } from './sessions/single-session/single-session.component';

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
    FormsModule
  ],
  providers: [
    SessionsService,
    DayTableService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
