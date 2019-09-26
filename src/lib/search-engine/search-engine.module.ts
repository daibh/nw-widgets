import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchEngineComponent } from './search-engine.component';

export { SearchEngineComponent } from './search-engine.component';

@NgModule({
  declarations: [SearchEngineComponent],
  imports: [
    CommonModule
  ]
})
export class SearchEngineModule { }
