import { ShortDate } from './short-date.model';


export class SessionsOnDay {
  constructor(date: ShortDate, count: number, types: string[]) {
    this.Date = date;
    this.SessionCount = count;
    this.SessionTypes = types;
  }

  Date: ShortDate;
  SessionCount: number;
  SessionTypes: string[];
}
