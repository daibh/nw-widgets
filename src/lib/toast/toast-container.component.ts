import { Component, OnInit, TemplateRef } from '@angular/core';
import { ToastService } from './toast.service';

@Component({
  selector: 'ngx-toast-container',
  templateUrl: './toast-container.component.html',
  styleUrls: ['./toast-container.component.scss'],
  host: { '[class.toast-container]': 'true' }
})
export class ToastContainerComponent implements OnInit {

  constructor(
    public toastService: ToastService
  ) { }

  ngOnInit() {
  }

  isTemplate = toast => toast.textOrTpl instanceof TemplateRef;

}
