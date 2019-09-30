import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toasts: any[] = [];

  /**
   * add new toast into toast queue and show it
   * @param textOrTemplate text content or template of toast content
   * @param options options config inject into toast
   */
  show = (textOrTemplate: string | TemplateRef<any>, options: any = {}) => this.toasts.push({ textOrTemplate, options });

  /**
   * remove toast out of toast queue
   * @param toast toast want to remove out of queue
   */
  remove = toast => this.toasts = this.toasts.filter(t => t !== toast);

}
