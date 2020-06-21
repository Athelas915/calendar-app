import { Component } from '@angular/core';
import { Data } from './header/header.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'Fitness Club Calendar';
  month: number;
  year: number;

  constructor() {
    var dateNow = new Date();
    this.month = dateNow.getMonth();
    this.year = dateNow.getFullYear();
  }

  dataChanged(newData: Data) {
    this.month = newData.month;
    this.year = newData.year;
  }
}
