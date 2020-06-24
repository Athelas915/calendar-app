import { Component, OnInit, Input } from '@angular/core';
import { Session } from '../../models/session.model';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.sass']
})
export class DayComponent implements OnInit {
  @Input('day') day: number;
  @Input('month') month: number;
  @Input('year') year: number;
  @Input('active') active: boolean;
  @Input('sessions') sessions: Session[];

  clickable: boolean;

  constructor() { }

  ngOnInit(): void {
    if (!this.active) return;
    else {
    }
    this.clickable = (this.active && this.sessions.length > 0);
  }

  isClickableAndActive(cl: boolean, act: boolean): string {
    var now = new Date();
    var nowDay = now.getDate();
    var nowMonth = now.getMonth();
    var nowYear = now.getFullYear();

    var today: string;
    if (this.year == nowYear && this.month == nowMonth && this.day == nowDay) today = "today";
    else today = "";

    var classActive: string;
    if (act
        && (this.year > nowYear
        || (this.year == nowYear && this.month > nowMonth)
        || (this.year == nowYear && this.month == nowMonth && this.day >= nowDay))) classActive = "active";
    else classActive =  "inactive";

    var classClickable: string;
    if (cl) classClickable = "clickable";
    else classClickable = "unclickable";

    return classActive + ' ' + classClickable + ' ' + today;
  }
}
