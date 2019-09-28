import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TimelineService {

  constructor(private httpClient: HttpClient) { }

  getTimelineData(): Observable<TimelineResponse[]> {
    return this.httpClient.get<TimelineResponse[]>('/assets/data/timeline.json');
  }
}

export class TimelineResponse {
  constructor(
    public id: string,
    public isActive: boolean,
    public time: Date,
    public source: {
      title: string,
      events: TimelineEvent[]
    }
  ) { }
}

export class TimelineEvent {
  constructor(
    public name: string,
    public gender: string,
    public company: string,
    public email: string,
    public phone: string,
    public address: string
  ) { }
}
