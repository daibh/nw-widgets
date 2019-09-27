import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NwWidgetsModule } from '@oniwa/nw-widgets';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NwWidgetsModule
  ],
  exports: [
    CommonModule,
    NwWidgetsModule
  ]
})
export class SharedModule { }
