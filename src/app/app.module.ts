import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DayComponent } from './calendar/day/day.component';
import { SessionsComponent } from './calendar/sessions/sessions.component';
import { SessionsService } from './services/sessions.service';
import { DayTableService } from './services/day-table.service';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    HeaderComponent,
    FooterComponent,
    DayComponent,
    SessionsComponent
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
