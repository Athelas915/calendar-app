import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { Session } from '../../models/session.model';
import { Time } from '@angular/common';

@Component({
  selector: 'app-customer-sessions',
  templateUrl: './single-session.component.html',
  styleUrls: ['./single-session.component.sass']
})
export class SingleSessionComponent implements OnChanges {
  @Input("session") session: Session;
  @Output("change") id = new EventEmitter<number>();

  constructor() { }

  ngOnChanges(): void {
  }


  toStartTimeString(time: Time) {
    var ho;
    var min;

    if (time.hours >= 10) ho = time.hours;
    else ho = "0" + time.hours;
    if (time.minutes >= 10) min = time.minutes;
    else min = "0" + time.minutes;

    return ho + ":" + min;
  }

  toDurationString(time: Time) {
    var ho;
    var min;

    if (time.hours == 1) ho = time.hours + " hour ";
    else ho = time.hours + " hours, ";
    if (time.minutes == 0) min = ""
    else if (time.minutes == 1) min = time.minutes + " minute";
    else min = time.minutes + " minutes"

    return ho + min;
  }

  private get startTime() {
    var start = this.session.date;
    start.setHours(this.session.start.hours, this.session.duration.minutes);
    return start;
  }
  private get finishTime() {
    var finish = this.session.date;
    finish.setHours(this.session.start.hours + this.session.duration.hours, this.session.duration.minutes + this.session.duration.minutes);
    return finish;
  }
  private get now() {
    return new Date();
  }

  get sessionStarted(): boolean {
    if (this.startTime < this.now) return true;
    else return false;
  }

  get buttonText(): string {
    if (this.session.isEnrolled) return "Cancel";
    else return "Sign up!"
  }

  get info(): string {
    if (this.finishTime < this.now) return "Finished."
    else if (this.startTime < this.now) return "In progress"
    else {
      if (this.session.isEnrolled) return "Signed up.";
      else return "Not signed up."
    }
  }

  change() {
    this.id.emit(this.session.id)
  }
}
