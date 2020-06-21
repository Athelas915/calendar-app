import { Component } from '@angular/core';

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
    this.month = 1;
    this.year = 2020;
  }
}
