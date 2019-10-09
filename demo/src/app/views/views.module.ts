import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ViewsRoutingModule } from './views-routing.module';
import { ViewsComponent } from './views.component';
import { HomeComponent } from './home/home.component';
import { SearchEngineComponent } from './search-engine/search-engine.component';
import { FooterComponent } from '../layout/footer/footer.component';
import { HeaderComponent } from '../layout/header/header.component';
import { TimelineComponent } from './timeline/timeline.component';
import { CommonConceptComponent } from './common-concept/common-concept.component';
import { ToastComponent } from './toast/toast.component';
import { PersonComponent } from './person/person.component';
import { PersonFormComponent } from './person/components/person-form/person-form.component';
import { PersonAddComponent } from './person/components/person-add/person-add.component';
import { PersonEditComponent } from './person/components/person-edit/person-edit.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ViewsComponent,
    HomeComponent,
    SearchEngineComponent,
    TimelineComponent,
    CommonConceptComponent,
    ToastComponent,
    PersonComponent,
    PersonFormComponent,
    PersonAddComponent,
    PersonEditComponent,
  ],
  imports: [
    SharedModule,
    ViewsRoutingModule
  ],
  entryComponents: [],
  providers: []
})
export class ViewsModule { }
