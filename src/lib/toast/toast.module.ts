import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './toast.component';
import { ToastContainerComponent } from './toast-container.component';

@NgModule({
  declarations: [ToastComponent, ToastContainerComponent],
  imports: [
    CommonModule
  ],
  exports: [
    ToastComponent,
    ToastContainerComponent
  ]
})
export class ToastModule { }
