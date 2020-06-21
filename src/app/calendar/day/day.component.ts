import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.sass']
})
export class DayComponent implements OnInit {
  @Input('day') day: number;
  @Input('month') month: number;
  @Input('year') year: number;

  constructor() { }

  ngOnInit(): void {
  }

}
