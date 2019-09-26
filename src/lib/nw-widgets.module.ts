import { NgModule } from '@angular/core';
import { SearchEngineModule } from './search-engine/search-engine.module';

export * from './search-engine/search-engine.module';

const NW_WIDGETS_MODULE = [SearchEngineModule];

@NgModule({
  imports: NW_WIDGETS_MODULE,
  exports: NW_WIDGETS_MODULE
})
export class NwWidgetsModule { }
