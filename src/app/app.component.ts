import { Component, OnInit } from '@angular/core';
import { Data } from './header/header.component'
import { Session } from './models/session.model'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'Fitness Club Calendar';
  month: number;
  year: number;
  sessions: Session[];

  constructor() {
    var dateNow = new Date();
    this.month = dateNow.getMonth();
    this.year = dateNow.getFullYear();
  }

  ngOnInit() {
    this.sessions = MockData(5);
  }

  dataChanged(newData: Data) {
    this.month = newData.month;
    this.year = newData.year;
  }
}

function MockData(n: number): Session[] {
  var result = new Array(n);
  var types = ["Pilates", "Yoga", "Spinning"];
  var coaches = ["John Smith", "Alex Turner", "Mike Spears"]
  var today = new Date();
  for (var i = 0; i < n; i++) {
    var session = new Session();
    session.id = i;
    session.type = types[i % types.length];
    session.coach = coaches[i%coaches.length];
    session.room = i * 3 + 1;
    session.date = new Date(today.getFullYear(), (today.getMonth() + 1) % 12, (today.getDate() + 3 *  1 + i%3)%30 + 1);
    session.start = { hours: 8 + i%9, minutes: 0 }
    session.duration = { hours: 1, minutes: 30 }

    result[i] = session;
  }

  return result;
}
