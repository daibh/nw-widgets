import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchEngineComponent } from './search-engine.component';
import { SearchEngineDropdownComponent } from './search-engine-dropdown.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export { SearchEngineComponent } from './search-engine.component';

@NgModule({
  declarations: [SearchEngineComponent, SearchEngineDropdownComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [SearchEngineComponent, SearchEngineDropdownComponent]
})
export class SearchEngineModule { }
