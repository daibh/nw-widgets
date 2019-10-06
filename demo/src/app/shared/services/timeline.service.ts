import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TimelineService {

  constructor(private httpClient: HttpClient) { }

  getTimelineData(): Observable<TimelineResponse[]> {
    return this.httpClient.get<TimelineResponse[]>(`${environment.FAKE_API}/assets/data/timeline.json`);
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
