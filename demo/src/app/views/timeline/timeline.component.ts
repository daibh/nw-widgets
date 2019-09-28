import { Component, OnInit } from '@angular/core';
import { TimelineService, TimelineResponse } from 'src/app/shared/services/timeline.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  timelineSource: Observable<TimelineResponse[]>;

  constructor(
    private service: TimelineService
  ) { }

  ngOnInit() {
    this.timelineSource = this.service.getTimelineData();
  }

}
