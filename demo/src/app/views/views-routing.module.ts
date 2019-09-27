import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewsComponent } from './views.component';
import { HomeComponent } from './home/home.component';
import { SearchEngineComponent } from './search-engine/search-engine.component';


export const VIEWS_ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      name: 'Trang chủ',
      title: 'Trang chủ'
    }
  },
  {
    path: '',
    component: ViewsComponent,
    children: [
      {
        path: 'search-engine',
        component: SearchEngineComponent,
        data: {
          name: 'Động cơ tìm kiếm',
          title: 'Động cơ tìm kiếm'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(VIEWS_ROUTES)],
  exports: [RouterModule]
})
export class ViewsRoutingModule { }
