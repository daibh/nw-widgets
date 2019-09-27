import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ViewsRoutingModule } from './views-routing.module';
import { ViewsComponent } from './views.component';
import { HomeComponent } from './home/home.component';
import { SearchEngineComponent } from './search-engine/search-engine.component';
import { FooterComponent } from '../layout/footer/footer.component';
import { HeaderComponent } from '../layout/header/header.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ViewsComponent,
    HomeComponent,
    SearchEngineComponent
  ],
  imports: [
    SharedModule,
    ViewsRoutingModule
  ],
  providers: []
})
export class ViewsModule { }
