import { Component, ContentChild, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'ngx-timeline',
  exportAs: 'nwTimeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent {

  @Input() source: any;
  @Input() isTwoColumn: boolean = true;

  showAccordion = 1;
  @ContentChild('singleTemplateRef', { read: TemplateRef, static: false }) singleEventTemplateRef: TemplateRef<any>;
  @ContentChild('multipleTemplateRef', { read: TemplateRef, static: false }) multipleEventsTemplateRef: TemplateRef<any>;
  constructor() { }

  isMultitlePanel = (item: { events: any }) => item && item.events && item.events instanceof Array;
  
  getObjectkeys = obj => Object.keys(obj);

}
