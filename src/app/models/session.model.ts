import { Time } from '@angular/common';

export class Session {
  id: number;
  type: string;
  coach: string | null;
  date: Date;
  start: Time;
  duration: Time;
  room: number;
}
