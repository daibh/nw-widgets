import { Component, OnInit, Input, TemplateRef, ContentChild, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ngx-toast',
  exportAs: 'nwToast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

  @Input() delay: number;

  @Input() autohide: boolean;

  @Input() header: string;

  /**
   * A template like `<ng-template nwToastHeader></ng-template>` can be
   * used in the projected content to allow markup usage.
   */
  @ContentChild('[nwToastHeader]', {read: TemplateRef, static: true}) headerTemplate: TemplateRef<any>| null = null;

  @Output('hide') hideOutput = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

}
