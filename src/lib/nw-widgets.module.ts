import { NgModule } from '@angular/core';
import { SearchEngineModule } from './search-engine/search-engine.module';
import { TimelineModule } from './timeline/timeline.module';
import { ToastModule } from './toast/toast.module';

export * from './search-engine/search-engine.module';
export * from './timeline/timeline.module';
export * from './toast/toast.module';

const NW_WIDGETS_MODULE = [SearchEngineModule, TimelineModule, ToastModule];

@NgModule({
  imports: NW_WIDGETS_MODULE,
  exports: NW_WIDGETS_MODULE
})
export class NwWidgetsModule { }
