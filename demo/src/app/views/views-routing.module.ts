import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewsComponent } from './views.component';
import { HomeComponent } from './home/home.component';
import { SearchEngineComponent } from './search-engine/search-engine.component';
import { TimelineComponent } from './timeline/timeline.component';
import { ToastComponent } from './toast/toast.component';


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
      },
      {
        path: 'timeline',
        component: TimelineComponent,
        data: {
          name: 'Dòng thời gian',
          title: 'Dòng thời gian'
        }
      },
      {
        path: 'toast',
        component: ToastComponent,
        data: {
          name: 'Thông báo nổi',
          title: 'Thông báo nổi'
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
